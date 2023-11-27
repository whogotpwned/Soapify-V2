<template>
  <div  ref="htmlCardRef" >

    <!--
    <div v-if="!isChecked && isSender" class="ion-align-self-start">
      <ion-button  id="deleteButton" fill="clear" @click="deleteElement(id)">Del
        <ion-icon slot="end" :icon="trashBinOutline"></ion-icon>
      </ion-button>
    </div>
    -->

    <ion-card-header>

      <!--
      <div id="element-id">
        <ion-text>
          <ion-text color="danger">Element-ID: {{ id }}</ion-text>
        </ion-text>
      </div>
      -->
      <ion-card-title>
        <ion-grid>
          <ion-row justify-content-center>

            <ion-col class="ion-align-items-center" size="auto">
              <ion-input id="audioTitle" v-model="localTitle" :value="localTitle" class="ion-text-sm-center"
                         label-placement="floating"
                         readonly>
              </ion-input>
            </ion-col>

          </ion-row>
        </ion-grid>
      </ion-card-title>

      <ion-card-subtitle>
        <div>
          <ion-action-sheet
              :buttons="actionSheetButtons"
              :is-open="isOpen"
              @didDismiss="setOpen(false)"
          ></ion-action-sheet>
        </div>

      </ion-card-subtitle>

    </ion-card-header>

    <ion-card-content id="wrapper">

      <div v-if="checkboxVisible">
        <ion-item class="checkboxItem">
          <ion-checkbox label-placement="start" @click="markCheckboxesToBeDeleted"></ion-checkbox>
        </ion-item>
      </div>
      <div id="first">
        <ion-button id="playPauseButton" @click="playPauseAudio">
          <ion-icon slot="icon-only" :icon="playPauseButtonIcon"></ion-icon>
        </ion-button>
      </div>

      <div id="second">
        <div id="visualiserDiv">
          <ion-row>
            <ion-col class="ion-align-self-end">
              <div :id="containerId" @click="playPauseAudio">

              </div>
            </ion-col>

          </ion-row>

        </div>
      </div>
    </ion-card-content>

    <div id="dialogueTimestamp">
      <p>{{ getHumanReadableTimestampFromCreatedAt(created_at) }} Uhr</p>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import {
  IonAccordion, IonButton, IonCheckbox, IonIcon, IonItem, IonLabel, IonCard, IonText, IonCardHeader,
  IonCardSubtitle, IonChip, IonCardContent, IonAccordionGroup, IonInput, modalController, IonActionSheet, createGesture
} from '@ionic/vue';
import {heart, trashBinOutline, playCircleOutline, stopCircleOutline, ellipsisVerticalOutline} from 'ionicons/icons';
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
      openEditDetailsModel();
    }
  },
  {
    text: 'MARK TO DELETE',
    handler: () => {
      const event = new CustomEvent('checkboxVisibilityState')
      window.dispatchEvent(event)

    }

  },
  {
    text: 'TRANSSCRIPT',
    handler: () => {
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

    const insertChipsResultId = insertChipsResult.data.insert_chips.returning[0].id;

    const getChipsOfChatIdResult = await nhost.graphql.request(getChipsOfChatId, {
      chat_id: event.detail.id,
    });

    const chipsOfChatWithId = getChipsOfChatIdResult.data.chats[0].chips;

    const updateChipsOfChatWithId = await nhost.graphql.request(updateChipsInChatsTable, {
      chat_id: event.detail.id,
      chips: [...chipsOfChatWithId, insertChipsResultId]
    });


    props.audiosMerged = props.audiosMerged.map((audio: any) => {

      if (audio.chat_id === event.detail.id) {
        // extend object by tag
        audio["chips"].push(event.detail.tag);
      }
      return audio;
    });
  } catch (e) {

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

window.addEventListener('editDetailsModalChangesTitle', (event: any) => {

  localTitle.value = event.detail.title;
})


</script>

<style scoped>
@import './style.css';
</style>
