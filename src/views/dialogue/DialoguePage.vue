<template lang="pug">
ion-page
  ion-loading(message="Lade Dialoge ...")
  ion-header
    ion-toolbar
      ion-toolbar(id="dialoguePartnerToolbar")
        div(id="wrapper" v-if="store.getLastActiveChatWasWithID")
          div(id="dialoguePartnerAvatar")
            ion-avatar
              img(:src='store.getCurrentDialoguePartner.avatarUrl')
          div(id="dialoguePartnerName")
            ion-title {{ store.currentDialoguePartner.user_id }}

      ion-searchbar(id="open-modal" :cancel-button-icon="trash" :placeholder="searchbarPlaceholder"
        show-cancel-button="always" @ionCancel="clearSearch" @ionFocus="openModal")

    div(v-if="audioElementsToBeDeleted.length > 0")
      ion-button(id="deleteAllCheckedBoxes" fill="clear" @click="deleteMarkedCheckboxes") Ausgewählte Elemente löschen
        ion-icon(slot="end")

  ion-content(:fullscreen="true")
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

    div(v-if="store.lastActiveChatWasWithID")
      div(v-for="audio in getAudiosMerged()" key="audio.id" id="audioElementsMerged")
        AudioElement(:id="audio.id" :key="audio.id" :aTags="audio.chips" :isSender="audio.sentByMe" :path="audio.record" :senderAvatar="audio.senderAvatar" :spoken="audio.spokenText" :title="audio.title")

  ion-footer
    ion-toolbar
      div(v-if="store.currentDialoguePartner.user_id")
        div(v-if="!isRecording")
          ion-button(id="recordingButton" shape="round" @click="startRecording()")
            ion-icon(slot="icon-only" :icon="recordingOutline")
        div(v-else)
          ion-button(id="recordingButton" shape="round" @click="stopRecording()")
            ion-icon(slot="icon-only" :icon="stopCircleOutline")
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {modalController, onIonViewWillEnter} from "@ionic/vue";
import Swal from "sweetalert2";
import {useSpeechRecognition} from '@vueuse/core'
import {v4 as uuidv4} from 'uuid';
import Modal from "@/components/modals/contact/search/SearchContactModal.vue";
import _ from 'lodash';
import {supabase} from "@/lib/supabase/supabaseClient";
import {
  getAvatarForID,
  getChatsOfUserWithIDSentToUserWithID,
  getChipsOfSpecificDialogBetweenUserAndContact,
  getUserDetailsOfUserWithID,
  getUserSession,
  messageSentByMe
} from "@/lib/supabase/supabaseMethods";
import {success_toast, error_toast, aufnahmeGestartetToast} from "@/views/toasts/messages";
import {IonContent, IonHeader, IonIcon, IonLoading, IonPage, IonTitle, IonToolbar, loadingController} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import AudioElement from "@/components/audio/AudioElement.vue";
import {VoiceRecorder} from "capacitor-voice-recorder";
import {recordingOutline, stopCircleOutline, trash} from 'ionicons/icons';
import {userSessionStore} from "@/lib/store/userSession";
import {getCurrentDateTimestamp} from "@/views/dialogue/methods";
import {insertNewDialogue, updateChips} from "@/lib/graphQL/mutations";
import {nhost} from "@/lib/nhostSrc/client/nhostClient";
import {counterNumberOfChatsBetweenIDAndContact,
  getDialoguesBetweenIDAndContact} from "@/lib/graphQL/queries";

const {
  result,
  start,
  stop,
} = useSpeechRecognition({
  lang: 'de-DE',
  interimResults: false,
  continuous: false,
})

const store = userSessionStore();
const audiosMerged = ref([] as Array<Object>);
const currentDialoguePartner = ref({});
const isRecording = ref(false);
const searchTerm = ref('');
const searchbarPlaceholder = ref('Suche ...');
const audiosBackupMerged = ref([] as Array<Object>);
const audioElementsToBeDeleted = ref([] as Array<String>);


const showLoading = async () => {
  const loading = await loadingController.create({
    message: 'Lade Dialoge ...',
  });
  loading.present();
};

const stopLoading = async () => {
  await loadingController.dismiss();
};

onIonViewWillEnter(() => {
  refreshAllChats();
});

refreshAllChats();

async function refreshAllChats() {

  const numberOfChatsBetweenIDAndContactResult = await nhost.graphql.request(counterNumberOfChatsBetweenIDAndContact, {
    user_id: store.getSessionID,
    contact: store.getCurrentDialoguePartner.user_id
  });

  const numberOfChatsBetweenIDAndContactNhost = numberOfChatsBetweenIDAndContactResult.data.chats_aggregate.aggregate.count;
  const numberOfChatsBetweenIDAndContactStore = store.getCurrentDialoguePartner.dialogues.length;


  if (numberOfChatsBetweenIDAndContactStore < numberOfChatsBetweenIDAndContactNhost) {
    console.log("Loading from Nhost");

    const dialoguesBetweenIDAndContactResult = await nhost.graphql.request(getDialoguesBetweenIDAndContact, {
      user_id: store.getSessionID,
      contact: store.getCurrentDialoguePartner.user_id
    });

    const dialogues = dialoguesBetweenIDAndContactResult.data.chats;

    store.setDialoguesOfCurrentDialoguePartner(dialogues);
    audiosMerged.value = store.getCurrentDialoguePartner.dialogues;
  } else {
    console.log("Loading from Store");
    audiosMerged.value = store.getCurrentDialoguePartner.dialogues;
  }

  // sort audiosMerged.value by created_at in descending order
  audiosMerged.value = audiosMerged.value.sort((a: any, b: any) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  })

  // add another key to each audio element to indicate whether it was sent by me or not if user_id matches
  // store.getSessionID it is sent by me
  audiosMerged.value = audiosMerged.value.map((audio: any) => {
    audio.sentByMe = audio.user_id === store.getSessionID;
    return audio;
  });
}

function getAudiosMerged() {
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

window.addEventListener('search', (event: any) => {
  searchTerm.value = event.detail.chipSuche;
  /* only keep those cards which contain a tag matching chipSuche */
  audiosMerged.value = audiosMerged.value.filter((audio: any) => {
    return audio.tags.some((tag: any) => {
      return tag.value.includes(searchTerm.value);
    });
  });
  searchbarPlaceholder.value = `chipSuche:[${event.detail.chipSuche}]`;
});

window.addEventListener('addChip',async (event: any) => {
  // add the tag to the json object of the respective audio element matching the id
  const tagID = uuidv4();
  audiosMerged.value = audiosMerged.value.map((audio: any) => {

    if (audio.chat_id === event.detail.id) {
      // extend object by tag
      audio["chips"].push({id: tagID, value: event.detail.tag});
    }
    return audio;
  });

  //TODO: add to nhost
  const updateChipResult = await nhost.graphql.request(updateChips, {
    chat_id: event.detail.id,




  });
});

window.addEventListener('openDialogue', (event: any) => {
  currentDialoguePartner.value = {
    user: event.detail.user,
    user_id: event.detail.user_id,
    email: event.detail.email,
    avatarUrl: store.getAvatarUrlFromContactInformationForID(event.detail.user_id)
  };
});

window.addEventListener('deleteTag', (event: any) => {
  audiosMerged.value = audiosMerged.value.map((audio: any) => {
    if (audio.id === event.detail.id) {
      // remove tag from object
      audio.tags = audio.tags.filter((tag: any) => {
        return tag.id !== event.detail.tag.id;
      });
      //TODO: delete in nhost

    }
    return audio;
  });
});

window.addEventListener('deleteElement', (event: any) => {
  getUserSession().then((current_user_id) => {
    messageSentByMe(current_user_id, event.detail.id).then((sentByMe) => {
      if (sentByMe) {
        audiosMerged.value = audiosMerged.value.filter((audio: any) => {
          return audio.id !== event.detail.id;
        });

        audiosMerged.value = audiosMerged.value.filter((audio: any) => {
          return audio.id !== event.detail.id;
        });

        //TODO: delete in nhost

      } else {
        error_toast.fire({
          icon: 'error',
          title: 'Empfangene Nachrichten können aktuell nicht gelöscht werden.'
        });
      }
    })
    currentDialoguePartner.value = {};

  });
});

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

function deleteMarkedCheckboxes() {
  Swal.fire({
    title: 'Ausgewählte Elemente wirklich unwiderruflich löschen?',
    showCancelButton: true,
    confirmButtonText: 'Löschen',
    denyButtonText: `Don't save`,
    heightAuto: false
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        audiosMerged.value = audiosMerged.value.filter((audio: any) => {
          return !audioElementsToBeDeleted.value.includes(audio.id)
        });

        //TODO: delete in nhost

      } catch (e) {
        Swal.fire({
          title: 'Fehler :(',
          text: 'Löschen fehlerhaft',
          icon: 'error',
          confirmButtonText: 'Cool',
          heightAuto: false
        })
      }
    }
  });
}

async function requestPermission() {
  return (await VoiceRecorder.requestAudioRecordingPermission()).value;
}

async function startRecording() {
  start();
  await requestPermission();

  aufnahmeGestartetToast.fire({
    icon: 'success',
    title: 'Aufnahme gestartet'
  });
  isRecording.value = true;
  return (await VoiceRecorder.startRecording()).value;
}

async function stopRecording() {
  stop();
  const recordedAudio = (await VoiceRecorder.stopRecording()).value;
  const audioBase64 = recordedAudio.recordDataBase64;
  const title = 'Recording: ' + getCurrentDateTimestamp();
  isRecording.value = false;

  const insertNewDialogueResult = await nhost.graphql.request(insertNewDialogue, {
    audio: audioBase64,
    contact: store.getCurrentDialoguePartner.user_id,
    title: title,
    speech_to_text: result.value,
    chips: [],
    user_id: store.getSessionID,
  });

  const generatedChatId = insertNewDialogueResult.data.insert_chats_one.chat_id;

  const newAudioElement = {
    id: generatedChatId,
    created_at: getCurrentDateTimestamp(),
    senderAvatar: store.getAvatarURL,
    record: audioBase64,
    title: title,
    spokenText: result.value,
    chips: []
  }

  audiosMerged.value.push(newAudioElement);

  store.addDialogueToCurrentDialoguePartner(newAudioElement);
}

function clearSearch() {
  audiosMerged.value = audiosBackupMerged.value;
  audiosBackupMerged.value = [];
  searchbarPlaceholder.value = 'Suche ...';
}
</script>

<style scoped>
@import './style.css';
</style>
