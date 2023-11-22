<template>

  <div id="wrapper">

    <div class="{audioIsSender: isSender, audioIsReceived: !isSender}">

      {{ id }}

      <ion-card id="audio-card">

        <ion-card-header>

          <ion-card-title>

            <ion-grid>

              <ion-row>

                <ion-col id="titleAndTags" size="auto">
                  <ion-input id="inputTitle" v-model="localTitle" :value="localTitle" label-placement="floating"
                             readonly>
                  </ion-input>
                </ion-col>

              </ion-row>


            </ion-grid>

          </ion-card-title>


          <ion-card-subtitle>
            <ion-grid>


              <ion-col size="8">

              </ion-col>

              <ion-col size="8">

              </ion-col>

              <ion-col>
                <ion-button id="actionSheet" class="ion-align-self-end" size="small" @click="setOpen(true)">
                  <ion-action-sheet
                      :buttons="actionSheetButtons"
                      :is-open="isOpen"
                      header="Actions"

                  ></ion-action-sheet>
                  <ion-icon :icon="ellipsisVerticalOutline"></ion-icon>
                </ion-button>

              </ion-col>

            </ion-grid>
          </ion-card-subtitle>

        </ion-card-header>


        <ion-card-content>
          <ion-grid :fixed="true">

            <ion-row id="audioVisualiserRow">

              <ion-col id="audio-element" size="auto">
                <AVBars :bar-color="['#f00', '#ff0', '#0f0']" :caps-height="2" :src="`data:audio/wav;base64,${path}`"
                        canv-fill-color='#000' caps-color='#FFF' type="audio/mpeg">
                </AVBars>
              </ion-col>

            </ion-row>

            <ion-row id="firstRow">

              <ion-col size="auto">
                <!--
                <div v-if="!isChecked && isSender">
                  <ion-button :icon="trashBinOutline" id="deleteButton" fill="clear" @click="deleteElement(id)">Del
                  </ion-button>
                </div>
                -->


                <div v-if="checkboxVisible" >
                  <ion-item class="checkboxItem">
                  <ion-checkbox v-model="isChecked" label-placement="start" @click="markCheckboxesToBeDeleted"></ion-checkbox>
                  </ion-item>
                </div>

              </ion-col>

            </ion-row>

          </ion-grid>
        </ion-card-content>


      </ion-card>
    </div>


    <ion-card-header>
      <div id="element-id">
      </div>
    </ion-card-header>
  </div>

</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {
  IonAccordion, IonButton, IonCheckbox, IonIcon, IonItem, IonLabel, IonCard, IonText, IonCardHeader,
  IonCardSubtitle, IonChip, IonCardContent, IonAccordionGroup, IonInput, IonActionSheet, modalController
} from '@ionic/vue';

import {heart, trashBinOutline, ellipsisVerticalOutline} from 'ionicons/icons';


import {v4 as uuidv4} from 'uuid';

import {AVBars} from 'vue-audio-visual';
import {insertChipInChipsTable, updateChipsInChatsTable, updateTitleInChatsTable} from "@/lib/graphQL/mutations";

import Swal from 'sweetalert2';
import copy from 'copy-to-clipboard';
import {nhost} from "@/lib/nhostSrc/client/nhostClient";
import {userSessionStore} from "@/lib/store/userSession";
import EditDetailsModal from "@/components/modals/audio/EditDetailsModal.vue";
import {getChipsOfChatId} from "@/lib/graphQL/queries";
import TransscriptModal from "@/components/modals/audio/TransscriptModal.vue";

const props = defineProps({
  path: String,
  id: String,
  spoken: String,
  title: String,
  senderAvatar: String,
  isSender: Boolean,
  audiosMerged: [],
  checkboxVisible: Boolean
});

const store = userSessionStore();

let localTitle = ref(props.title);
let isChecked = ref(false);
const isOpen = ref(false);
const message = ref('');

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
      spoken: props.spoken
    }
  });
  await modal.present();
}

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
