<template lang="pug">
ion-page
  ion-loading(message="Lade Dialoge ...")
  ion-header
    ion-toolbar
      ion-toolbar(id="dialoguePartnerToolbar")
        div(id="wrapper" v-if="store.getLastActiveChatWasWithID")
          div(id="dialoguePartnerAvatar")
            ion-avatar(@click="openUserDetailsModal(store.getCurrentDialoguePartner.avatarUrl, store.getCurrentDialoguePartner.user_id, store.getCurrentDialoguePartner.email)")
              img(:src='store.getCurrentDialoguePartner.avatarUrl')
          div(id="dialoguePartnerName")
            ion-title {{ store.currentDialoguePartner.user_id }}

      ion-searchbar(id="open-modal" :cancel-button-icon="trash" :placeholder="searchbarPlaceholder"
        show-cancel-button="always" @ionCancel="clearSearch" @ionFocus="openModal")

    div(v-if="audioElementsToBeDeleted.length > 0 && checkboxVisible")
      ion-button(id="deleteAllCheckedBoxes" fill="clear" @click="deleteMarkedCheckboxes") Ausgewählte Elemente löschen
        ion-icon(slot="end")
    div(v-if="checkboxVisible")
      ion-button(id="dismissMarkToDelete" fill="clear" @click="checkboxVisible=false") Cancel
        ion-icon(slot="end")



  ion-content(:fullscreen="true" id="dialoguePage")

    div(v-if="!store.lastActiveChatWasWithID" id="alone")
      div(align="center")
        h1(id="forever-alone-head") 🧐
        h3 Nothing to see here ...

    ion-refresher(slot="fixed" @ionRefresh="handleRefresh($event)")
      ion-refresher-content

    ion-header(collapse="condense")
      ion-toolbar
        ion-title(size="large") Dialoge

    ExploreContainer(name="Tab 1 page")

    ion-list
      div(v-if="store.lastActiveChatWasWithID")
        div(v-for="audio in audiosMerged" key="audio.id" id="audioElementsMerged")
          ion-item
            AudioElement(:id="audio.chat_id" :key="audio.chat_id" :aChips="audio.chips" :isSender="audio.sentByMe"
              :path="audio.audio" :senderAvatar="audio.senderAvatar" :spoken="audio.speech_to_text" :title="audio.title"
              :checkboxVisible="checkboxVisible")

  div
    ion-footer(id="footer")
      ion-toolbar(id="footerToolbar")

        div(v-if="store.currentDialoguePartner.user_id")
          div(v-if="!isRecording")
            ion-button(id="recordingButton" shape="round" @click="startRecording()")
              ion-icon(slot="icon-only" :icon="recordingOutline")
          div(v-else)
            ion-button(id="recordingButton" shape="round" @click="stopRecording()")
              ion-icon(slot="icon-only" :icon="stopCircleOutline")
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, watch, watchEffect} from 'vue'
import {modalController, onIonViewWillEnter} from "@ionic/vue";
import Swal from "sweetalert2";
import {useSpeechRecognition} from '@vueuse/core'
import {v4 as uuidv4} from 'uuid';
import Modal from "@/components/modals/contact/search/SearchDialogueModal.vue";
import _ from 'lodash';
import {success_toast, error_toast, aufnahmeGestartetToast, info_toast, new_chat_toast} from "@/views/toasts/messages";
import {
  IonContent, IonHeader, IonIcon, IonLoading, IonPage, IonTitle, IonToolbar, loadingController,
  IonAvatar, IonSearchbar, IonButton, IonRefresher, IonRefresherContent, IonFooter
} from '@ionic/vue';

import ExploreContainer from '@/components/ExploreContainer.vue';
import {VoiceRecorder} from "capacitor-voice-recorder";
import {recordingOutline, stopCircleOutline, trash, caretDownOutline, trendingDown} from 'ionicons/icons';
import {userSessionStore} from "@/lib/store/userSession";
import {getCurrentDateTimestamp} from "@/views/dialogue/methods";
import {
  deleteChatInChatsTableByUserIdAndChatId, deleteMultipleChatsInChatsTableByUserIdAndChatIds,
  insertChipInChipsTable,
  insertNewDialogue,
  updateChipsInChatsTable
} from "@/lib/graphQL/mutations";
import {nhost} from "@/lib/nhostSrc/client/nhostClient";
import {
  counterNumberOfChatsBetweenIDAndContact,
  getDialoguesBetweenIDAndContact,
  getChipsOfChatId,
  getChipsWithId,
  getDialoguesBetweenIDAndContactSubscription,
  getChatIdOfChatWithTitle, getChatsOfUserBetweenUserWithIdAndUserWithAnotherIdInTimeRange
} from "@/lib/graphQL/queries";
import {createClient} from 'graphql-ws';
import NewAudioElement from "@/views/audio/NewAudioElement.vue";
import ShowContactDetailsModal from "@/components/modals/contact/details/ShowContactDetailsModal.vue";
import AudioElement from "@/components/audio/AudioElement.vue";

const lang = ref('de-DE')
const speech = useSpeechRecognition({
  lang,
  continuous: true,
})



const store = userSessionStore();
const audiosMerged = ref([] as Array<Object>);
const currentDialoguePartner = ref({});
const isRecording = ref(false);
const titleSearch = ref('');
const dateSearch = ref('');
const searchbarPlaceholder = ref('Suche ...');
const audiosBackupMerged = ref([] as Array<Object>);
const audioElementsToBeDeleted = ref([] as Array<String>);
const receivedNewMessage = ref(false);
const checkboxVisible = ref(false);


onIonViewWillEnter(() => {
  refreshAllChats();
});

refreshAllChats();

watch(() => audiosMerged.value, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    audiosMerged.value.sort((a, b) => {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
  }
});

async function openUserDetailsModal(avatar, user_id, email) {
  const modal = await modalController.create({
    component: ShowContactDetailsModal,
    componentProps: {
      avatarUrl: avatar,
      userId: user_id,
      email: email
    }
  })
  modal.present();
}


async function refreshAllChats() {

  if(!store.currentDialoguePartner.user_id) {
    return;
  }

  const numberOfChatsBetweenIDAndContactResult = await nhost.graphql.request(counterNumberOfChatsBetweenIDAndContact, {
    user_id: store.getSessionID,
    contact: store.getCurrentDialoguePartner.user_id
  });

  const numberOfChatsBetweenIDAndContactNhost = numberOfChatsBetweenIDAndContactResult.data ? numberOfChatsBetweenIDAndContactResult.data.chats_aggregate.aggregate.count : 0;
  const numberOfChatsBetweenIDAndContactStore = store.getCurrentDialoguePartner.dialogues ? store.getCurrentDialoguePartner.dialogues.length : 0;

  if (numberOfChatsBetweenIDAndContactStore < numberOfChatsBetweenIDAndContactNhost) {
    console.log("Loading from Nhost");

    const dialoguesBetweenIDAndContactResult = await nhost.graphql.request(getDialoguesBetweenIDAndContact, {
      user_id: store.getSessionID,
      contact: store.getCurrentDialoguePartner.user_id
    });

    let dialogues = dialoguesBetweenIDAndContactResult.data.chats;

    for (let i = 0; i < dialogues.length; i++) {
      const chipsOfSpecificDialogueBetweenIDAndContactResult = await nhost.graphql.request(getChipsWithId, {
        ids: dialogues[i].chips
      });

      dialogues[i].chips = [];

      chipsOfSpecificDialogueBetweenIDAndContactResult.data.chips.forEach((chipElement) => {

        dialogues[i].chips.push(chipElement.chip);
      });
    }


    store.setDialoguesOfCurrentDialoguePartner(dialogues);
    audiosMerged.value = store.getCurrentDialoguePartner.dialogues;
  } else {
    console.log("From Store")
    audiosMerged.value = store.getCurrentDialoguePartner.dialogues;
  }

  // sort audiosMerged.value by created_at in descending order
  audiosMerged.value = audiosMerged.value.sort((a: any, b: any) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  })

  // add another key to each audio element to indicate whether it was sent by me or not if user_id matches
  // store.getSessionID it is sent by me
  audiosMerged.value = audiosMerged.value.map((audio: any) => {
    audio.sentByMe = audio.user_id === store.getSessionID;
    return audio;
  });

  audiosMerged.value = getAudiosSortedByCreatedAt();
}

function getAudiosSortedByCreatedAt() {
  return audiosMerged.value.sort((a: any, b: any) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  })
}

function handleRefresh(event: any) {
  try {
    refreshAllChats();
    success_toast.fire({
      icon: 'success',
      title: 'Chats aktualisiert'
    });
  } catch (e) {
    error_toast.fire({
      icon: 'error',
      title: 'Chats konnten nicht aktualisiert werden'
    });
  } finally {
    event.target.complete();
  }
}

const openModal = async () => {
  audiosBackupMerged.value = _.cloneDeep(audiosMerged.value);
  const modal = await modalController.create({
    component: Modal,
  });
  modal.present();
};


window.addEventListener('search', async (event: any) => {

  if (event.detail.titelsucheSelected && !event.detail.dateSearchStartingChecked && !event.detail.dateSearchEndingChecked) {
    searchbarPlaceholder.value = `Titelsuche: [${event.detail.titelSuche}]`
    const getChatIdOfChatWithTitleResult = await nhost.graphql.request(getChatIdOfChatWithTitle, {
      title: event.detail.titelSuche,
    });
    const targetChatId = getChatIdOfChatWithTitleResult.data.chats[0].chat_id;

    // keep only the elements of audiosMerged where the chat_id matches targetChatId
    audiosMerged.value = audiosMerged.value.filter((audio: any) => {
      return audio.chat_id === targetChatId;
    });
  } else if (!event.detail.titelsucheSelected && (event.detail.dateSearchStartingChecked || event.detail.dateSearchEndingChecked)) {

    searchbarPlaceholder.value = `Datumssuche: [${event.detail.dateSearchStarting} - ${event.detail.dateSearchEnding}]`

    const getChatsOfUserBetweenUserWithIdAndUserWithAnotherIdInTimeRangeResult = await nhost.graphql.request(getChatsOfUserBetweenUserWithIdAndUserWithAnotherIdInTimeRange, {
      user_id: store.getSessionID,
      contact: store.getCurrentDialoguePartner.user_id,
      start: event.detail.dateSearchStarting,
      end: event.detail.dateSearchEnding
    });

    console.log(getChatsOfUserBetweenUserWithIdAndUserWithAnotherIdInTimeRangeResult);

    const targetChatIds = getChatsOfUserBetweenUserWithIdAndUserWithAnotherIdInTimeRangeResult.data.chats.map((chat: any) => {
      return chat.chat_id;
    });

    audiosMerged.value = audiosMerged.value.filter((audio: any) => {
      // check if chat_id of audio is in targetChatIds
      return targetChatIds.includes(audio.chat_id);
    });
  }
});


window.addEventListener('openDialogue', (event: any) => {
  currentDialoguePartner.value = {
    user: event.detail.user,
    user_id: event.detail.user_id,
    email: event.detail.email,
    avatarUrl: store.getAvatarUrlFromContactInformationForID(event.detail.user_id)
  };
});

window.addEventListener('deleteChip', (event: any) => {

  audiosMerged.value = audiosMerged.value.map(async (audio: any) => {

    if (audio.chat_id === event.detail.id) {
      // remove tag from object
      audio.chips = audio.chips.filter((chip: any) => {
        return chip !== event.detail.chip
      });
      
      const deleteChipResult = await nhost.graphql.request(updateChipsInChatsTable, {
        chat_id: event.detail.id,
        chips: audio.chips
      });
    }
    return audio;
  });
});

window.addEventListener('deleteElement', async (event: any) => {
  // deleteChatInChatsTableByUserIdAndChatId
  audiosMerged.value = audiosMerged.value.filter((audio: any) => {
    return audio.chat_id !== event.detail.id;
  });

  const deleteChatInChatsTableByUserIdAndChatIdResult = await nhost.graphql.request(deleteChatInChatsTableByUserIdAndChatId, {
    user_id: store.getSessionID,
    chat_id: event.detail.id
  });

  store.deleteDialogueWithId(event.detail.id);
});

onMounted(async () => {
  const client = createClient({
    url: nhost.graphql.wsUrl,
    connectionParams: () => {
      const token = nhost.auth.getAccessToken();
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },
  });

  const subscription = client.subscribe({
    query: getDialoguesBetweenIDAndContactSubscription,
    variables: {
      user_id: store.getCurrentDialoguePartner.user_id,
      contact: store.getSessionID
    }
  }, {
    next(data) {

      const fireNotificationAndShowScrollDownArrow = () => {
        new_chat_toast.fire({
          icon: 'info',
          title: 'Neue Nachricht'
        });
        receivedNewMessage.value = true;
      };


      const lastDialogue = data.data.chats[0];

      if (!lastDialogue) return;

      // check if chat_id of lastDialogue is already in audiosMerged.value and not add id to it
      if (audiosMerged.value.some((audio: any) => {
        return audio.chat_id === lastDialogue.chat_id;
      })) {
        console.log("Nothing to update for audios :)");
      } else {
        audiosMerged.value.push(lastDialogue);

        if (!store.getCurrentDialoguePartner.dialogues.some((audio: any) => {
          return audio.chat_id === lastDialogue.chat_id;
        })) {
          store.addDialogueToCurrentDialoguePartner(lastDialogue);
        }
        fireNotificationAndShowScrollDownArrow();
      }
    },
    complete() {
      console.log('done');
    },
    error(e) {
      console.log(e);
    },
  });
})

window.addEventListener('markCheckboxesToBeDeleted', (event: any) => {
  const checked = event.detail.boxChecked;
  const targetID = event.detail.id;

  if (checked) {
    audioElementsToBeDeleted.value = audioElementsToBeDeleted.value.filter((element: any) => {
      return targetID !== element;
    })
  } else {
    audioElementsToBeDeleted.value.push(targetID)
  }
});

window.addEventListener('checkboxVisibilityState', (event: any) => {
  checkboxVisible.value = true;
})

function deleteMarkedCheckboxes() {
  Swal.fire({
    title: 'Ausgewählte Elemente wirklich unwiderruflich löschen?',
    showCancelButton: true,
    confirmButtonText: 'Löschen',
    denyButtonText: `Don't save`,
    heightAuto: false
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        audiosMerged.value = audiosMerged.value.filter((audio: any) => {
          return !audioElementsToBeDeleted.value.includes(audio.chat_id)
        });

        const deleteMultipleChatsResult = await nhost.graphql.request(deleteMultipleChatsInChatsTableByUserIdAndChatIds, {
          user_id: store.getSessionID,
          chat_ids: audioElementsToBeDeleted.value
        });

        for (let i = 0; i < audioElementsToBeDeleted.value.length; i++) {
          store.deleteDialogueWithId(audioElementsToBeDeleted.value[i]);
        }

        audioElementsToBeDeleted.value = [];
      } catch (e) {
        Swal.fire({
          title: 'Fehler :(',
          text: 'Löschen fehlerhaft',
          icon: 'error',
          confirmButtonText: 'Cool',
          heightAuto: false
        })
      } finally {
        checkboxVisible.value =false
      }
    }
  });
}

async function requestPermission() {
  return (await VoiceRecorder.requestAudioRecordingPermission()).value;
}

async function startRecording() {

  await requestPermission();
  speech.result.value = '';

  aufnahmeGestartetToast.fire({
    icon: 'success',
    title: 'Aufnahme gestartet'
  });
  isRecording.value = true;
  speech.start();
  return (await VoiceRecorder.startRecording()).value;
}

async function stopRecording() {
  speech.stop();
  const recordedAudio = (await VoiceRecorder.stopRecording()).value;
  const audioBase64 = recordedAudio.recordDataBase64;
  const title = 'Recording: ' + getCurrentDateTimestamp();
  isRecording.value = false;

  const insertNewDialogueResult = await nhost.graphql.request(insertNewDialogue, {
    audio: audioBase64,
    contact: store.getCurrentDialoguePartner.user_id,
    title: title,
    speech_to_text: speech.result.value,
    chips: [],
    user_id: store.getSessionID,
  });

  if(insertNewDialogueResult.data) {
    const generatedChatId = insertNewDialogueResult.data.insert_chats_one.chat_id;

  const newAudioElement = {
    chat_id: generatedChatId,
    created_at: getCurrentDateTimestamp(),
    senderAvatar: store.getAvatarURL,
    audio: audioBase64,
    title: title,
    sentByMe: true,
    speech_to_text: speech.result.value,
    user_id: store.getSessionID,
    chips: []
  }

  audiosMerged.value.push(newAudioElement);

  store.addDialogueToCurrentDialoguePartner(newAudioElement);
}

}

function clearSearch() {
  audiosMerged.value = store.getCurrentDialoguePartner.dialogues
  store.setSearchObject({
    searchDetails: {
      titelsucheSelected: false,
      titelSuche: "",
      dateSearchStartingChecked: false,
      dateSearchStarting: "",
      dateSearchEndingChecked: false,
      dateSearchEnding: "",
    }
  });
  audiosBackupMerged.value = [];
  searchbarPlaceholder.value = 'Suche ...';
}
</script>

<style scoped>
@import './style.css';
</style>
