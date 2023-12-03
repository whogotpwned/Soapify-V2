<template lang="pug">
div(ref='htmlCardRef')
  ion-card-header
    ion-card-title
      ion-grid
        ion-row(justify-content-center='')
          ion-col.ion-align-items-center(size='auto')
            ion-input#audioTitle.ion-text-sm-center(v-model='localTitle' :value='localTitle' label-placement='floating' readonly='')
    ion-card-subtitle
      div
        ion-action-sheet(:buttons='actionSheetButtons' :is-open='isOpen' @didDismiss='setOpen(false)')
  ion-card-content#wrapper
    div(v-if='checkboxVisible')
      ion-item.checkboxItem
        ion-checkbox(label-placement='start' @click='markCheckboxesToBeDeleted')
    ion-grid
      ion-row
        ion-col(size="auto")
          #first
            ion-button#playPauseButton(@click='playPauseAudio')
              ion-icon(slot='icon-only' :icon='playPauseButtonIcon')
        ion-col(size="auto")
          #second
            #visualiserDiv
              ion-row
                ion-col.ion-align-self-end
                  div(:id='containerId' @click='playPauseAudio')
        ion-col(size="auto")
          div(id="humanReadableTimestamp")
            h5 {{ getHumanReadableTimestampFromCreatedAt(created_at) }} Uhr
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import {
  IonAccordion, IonButton, IonCheckbox, IonIcon, IonItem, IonLabel, IonCard, IonText, IonCardHeader,
  IonCardSubtitle, IonChip, IonCardContent, IonAccordionGroup, IonInput, modalController, IonActionSheet, createGesture
} from '@ionic/vue';

import {heart, trashBinOutline, ellipsisVerticalOutline, playCircleOutline, stopCircleOutline} from 'ionicons/icons';
import {trash, archive} from "ionicons/icons";
import {v4 as uuidv4} from 'uuid';
import {AVBars} from 'vue-audio-visual';
import {insertChipInChipsTable, updateChipsInChatsTable, updateTitleInChatsTable} from "@/lib/graphQL/mutations";
import WaveSurfer from "wavesurfer.js";
import Swal from 'sweetalert2';
import copy from 'copy-to-clipboard';
import {nhost} from "@/lib/nhostSrc/client/nhostClient";
import {userSessionStore} from "@/lib/store/userSession";
import EditDetailsModal from "@/components/modals/audio/EditDetailsModal.vue";
import TransscriptModal from "@/components/modals/audio/TransscriptModal.vue";
import {getChipsOfChatId} from "@/lib/graphQL/queries";
import {onLongPress} from "@vueuse/core";

const props = defineProps({
  path: String,
  id: String,
  spoken: String,
  title: String,
  senderAvatar: String,
  isSender: Boolean,
  created_at: String,
  audiosMerged: [],
  checkboxVisible: Boolean
});

const htmlCardRef = ref<HTMLElement | null>(null)
const wavesurfer = ref();
const wavesurferTotalTimeId = ref();
const wavewurferCurrentTimeId = ref();
const wavewurferRemainingTimeId = ref();

const store = userSessionStore();

const playPauseButtonIcon = ref(playCircleOutline);
const chips = ref([]);
let specificChip = ref('');
let localTitle = ref(props.title);
let isChecked = ref(false);
const isOpen = ref(false);
const message = ref('');
const containerId = ref();


const kopiertToast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'green',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
});

const openEditDetailsModel = async () => {

  const modal = await modalController.create({
    component: EditDetailsModal,
    componentProps: {
      id: props.id,
      title: localTitle.value,
    }
  });
  await modal.present();
}

const openTranscriptModal = async () => {

  const modal = await modalController.create({
    component: TransscriptModal,
    componentProps: {
      speech_to_text: props.spoken
    }
  });
  await modal.present();
}

onLongPress(htmlCardRef, () => {
  setOpen(true)
})

const actionSheetButtons = [
  {
    text: 'EDIT DETAILS',
    handler: () => {
      setOpen(false);
      openEditDetailsModel();
    }
  },
  {
    text: 'MARK TO DELETE',
    handler: () => {
      setOpen(false);
      const event = new CustomEvent('checkboxVisibilityState')
      window.dispatchEvent(event)
    }

  },
  {
    text: 'TRANSSCRIPT',
    handler: () => {
      setOpen(false);
      openTranscriptModal();
    }
  }
];

const setOpen = (state: boolean) => {
  isOpen.value = state;
};

window.addEventListener('addChip', async (event: any) => {

  try {
    const insertChipsResult = await nhost.graphql.request(insertChipInChipsTable, {
      chips: [{chip: event.detail.tag}]
    })


    console.log("asssadsadsadsadasad")
    console.log(insertChipsResult.data.insert_chips.returning)
    console.log("sadasdadsasdsadsadsadsad")

    const insertChipsResultId = insertChipsResult.data.insert_chips.returning[0].id;

    const getChipsOfChatIdResult = await nhost.graphql.request(getChipsOfChatId, {
      chat_id: event.detail.id,
    });


    // set default target_id to store.getSessionID and overwrite with store.getCurrentDialoguePartnerID.user_id if isSender is false
    // const target_id = event.detail.isSender ? store.getSessionID : store.getCurrentDialoguePartner.user_id;

    console.log("------------------>")
    console.log(getChipsOfChatIdResult.data.chats[0].chips);
    console.log(store.getSessionID)
    console.log("------------------>")

    const chipsOfChatWithId = getChipsOfChatIdResult.data.chats[0].chips[store.getSessionID];

    const updateChipsOfChatWithId = await nhost.graphql.request(updateChipsInChatsTable, {
      chat_id: event.detail.id,
      chips: {[store.getSessionID]: [...chipsOfChatWithId, insertChipsResultId]}
    });

  } catch (e) {
    console.log(e)
  }

});

function playPauseAudio() {
  try {
    wavesurfer.value.playPause();

  } catch (e) {
    console.log(e);
  } finally {
    if (wavesurfer.value.isPlaying()) {
      playPauseButtonIcon.value = stopCircleOutline;
    } else {
      playPauseButtonIcon.value = playCircleOutline;
    }
  }

  const totalTime = wavesurfer.value.getDuration(),
      currentTime = wavesurfer.value.getCurrentTime(),
      remainingTime = totalTime - currentTime;


  const setDynamicIDsForAudioStatistics = new Promise((resolve, reject) => {
    wavesurferTotalTimeId.value = `#${containerId.value}-time-total`;
    wavewurferCurrentTimeId.value = `#${containerId.value}-time-current`;
    wavewurferRemainingTimeId.value = `#${containerId.value}-time-remaining`;
    resolve((wavesurferTotalTimeId.value, wavewurferCurrentTimeId.value, wavewurferRemainingTimeId.value));
  });

  setDynamicIDsForAudioStatistics.then(() => {
    document.getElementById(wavesurferTotalTimeId.value).innerText = "Total: " + totalTime.toFixed(1) + "s";
    document.getElementById(wavewurferCurrentTimeId.value).innerText = "Current: " + currentTime.toFixed(1) + "s";
    document.getElementById(wavewurferRemainingTimeId.value).innerText = "Remaining: " + remainingTime.toFixed(1) + "s";
  });
}

function uuidObjectToString(uuidObject) {
  // Check if the object has a property with the actual UUID string
  if (uuidObject && uuidObject.uuid) {
    return uuidObject.uuid.toString();
  }

  // If no uuid property found, return the original object as a string
  return uuidObject.toString();
}

onMounted(async () => {
  const setContainerIdPromise = new Promise((resolve, reject) => {
    containerId.value = 'C' + uuidObjectToString(props.id).toString().replaceAll('-', '');
    resolve(containerId.value);
  });

  setContainerIdPromise.then(() => {
    wavesurfer.value = WaveSurfer.create({
      container: '#' + containerId.value,
      waveColor: '#0E61B4',
      progressColor: '#30A5E0',
      fillParent: true,
      minPxPerSec: 35,
      height: 85,
      cursor: true,
      responsive: true,
    });
    // use wavesurfer to load audio in props.path which is a base64 encoded string
    wavesurfer.value.load(`data:audio/wav;base64,${props.path}`);
  })
});


function getHumanReadableTimestampFromCreatedAt(createdAt: string) {
  const date = new Date(createdAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // if date is not today also split date into day, month and year
  if (date.getDate() !== new Date().getDate()) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
}

function addChip(id: string) {
  checkIfTagExists(specificChip.value).then((exists) => {
    if (exists) {
      specificChip.value = '';
    } else {
      if (specificChip.value === ' ') {
        specificChip.value = '';
        return;
      }

      chips.value.push({value: specificChip.value})

      /* send tag to parent component  */
      const event = new CustomEvent('addChip', {
        detail: {
          tag: specificChip.value,
          id: id,
          isSender: props.isSender
        },
      });
      window.dispatchEvent(event);
      specificChip.value = '';
    }
  });
}

function copySpokenToClipboard(spoken: String) {
  try {
    copy(spoken.toString());
    kopiertToast.fire({
      icon: 'success',
      title: 'Erfolgreich kopiert'
    })
  } catch (e) {
    kopiertToast.fire({
      icon: 'error',
      title: 'Konnte nicht kopiert werden ...'
    })
  }
}

function deleteChip(id: any, chip: any) {


  const event = new CustomEvent('deleteChip', {
    detail: {
      id: id,
      chip: chip
    },
  });
  window.dispatchEvent(event);

}

async function changeTitle(id: string) {

  const event = new CustomEvent('changeTitle', {
    detail: {
      title: localTitle.value,
      chat_id: id
    },
  });
  window.dispatchEvent(event)
}



function markCheckboxesToBeDeleted() {
  const event = new CustomEvent('markCheckboxesToBeDeleted', {
    detail: {
      id: props.id,
      boxChecked: isChecked.value
    },
  });
  window.dispatchEvent(event);
}

async function checkIfTagExists(tag: string) {
  return new Promise((resolve, _) => {
    chips.value.forEach((element) => {
      if (tag === element.value) {
        resolve(true);
      }
    })
    resolve(false);
  })
}

window.addEventListener('editDetailsModalChangesTitle', (event: any) => {

  if (event.detail.chat_id === props.id) {
    localTitle.value = event.detail.title;
  }

})


</script>

<style scoped>
@import './style.css';
</style>
