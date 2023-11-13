<template lang="pug">
div(id="wrapper")
  div(:class="{audioIsSender: isSender, audioIsReceived: !isSender}")
    ion-card(:id="id")
      div(v-if="!isChecked && isSender" )
        ion-button(id="deleteButton" fill="clear" @click="deleteElement(id)") Del
          ion-icon(slot="end" :icon="trashBinOutline")

      ion-item
        ion-checkbox(v-model="isChecked" label-placement="start" @click="markCheckboxesToBeDeleted")

      ion-card-header
        div(id="element-id")
          ion-text
            ion-text(color="danger") Element-ID: {{ id }}

        ion-accordion-group
          ion-accordion(value="first")
            ion-item(slot="header" color="light") Details

            div(slot="content" class="ion-padding")
              ion-text
                div(id="titleAndTags")
                  ion-input(label-placement='floating' v-model="localTitle" :value="localTitle" @keyup.enter="changeTitle(id)")
                    div(slot='label')
                      ion-text(color='danger') Titel

                  input(v-model="specificChip" @keyup.space="addChip(id)")

                ion-item(v-for="chip in aChips" id="audioChip")
                  ion-chip(color="tertiary" @click="deleteChip(id, chip)") {{ chip }}

      ion-card-content
        div(id="audio-element-with-spoken-text")
          ion-accordion-group
            ion-accordion(value="first")
              ion-item(slot="header" color="light")
                ion-label Transkript
                ion-button(id="kopierenButton" @click="copySpokenToClipboard(spoken)") Kopieren
              div(slot="content" class="ion-padding") {{ spoken }}

          ion-grid
            ion-row
              ion-col(size='40%')
                ion-button(id="playPauseButton" @click="playPauseAudio" size="large")
                  ion-icon(slot="icon-only" :icon="playPauseButtonIcon")
              ion-col(size='60%')
                div(:id="containerId" @click="playPauseAudio")

                  ion-grid
                    ion-row
                      ion-col(size='10px')
                        p(:id="wavewurferCurrentTimeId") 0.00
                      ion-col(size='10px')
                        p(:id="wavesurferTotalTimeId") 0.00
                      ion-col(size='10px')
                        p(:id="wavewurferRemainingTimeId") 0.00


  div(id="dialogueTimestamp")
    p {{ getHumanReadableTimestampFromCreatedAt(created_at) }}

</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import {
  IonAccordion, IonButton, IonCheckbox, IonIcon, IonItem, IonLabel, IonCard, IonText, IonCardHeader,
  IonCardSubtitle, IonChip, IonCardContent, IonAccordionGroup, IonInput
} from '@ionic/vue';
import {heart, trashBinOutline, playCircleOutline, stopCircleOutline} from 'ionicons/icons';
import {v4 as uuidv4} from 'uuid';
import {AVBars} from 'vue-audio-visual';
import {updateTitleInChatsTable} from "@/lib/graphQL/mutations";
import WaveSurfer from "wavesurfer.js";
import Swal from 'sweetalert2';
import copy from 'copy-to-clipboard';
import {nhost} from "@/lib/nhostSrc/client/nhostClient";
import {userSessionStore} from "@/lib/store/userSession";

const props = defineProps({
  path: String,
  id: String,
  spoken: String,
  aChips: [],
  title: String,
  senderAvatar: String,
  isSender: Boolean,
  created_at: String
});

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


})

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
  const updateTitleInChatsTableResult = await nhost.graphql.request(updateTitleInChatsTable, {
    chat_id: id,
    user_id: store.getSessionID,
    title: localTitle.value
  })
  store.updateDialogueTitleOfDialogueWithId(id, localTitle.value);
}

function deleteElement(id: string) {
  Swal.fire({
    title: 'Element wirklich unwiderruflich löschen?',
    showCancelButton: true,
    confirmButtonText: 'Löschen',
    denyButtonText: `Don't save`,
    heightAuto: false
  }).then((result) => {
    /* Read more chats isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        // send event to parent component DialoguePage.vue to delete element from audios array
        const event = new CustomEvent('deleteElement', {
          detail: {
            id: id
          },
        });
        window.dispatchEvent(event);
        // document.getElementById(id).remove();
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
</script>

<style scoped>
@import './style.css';
</style>
