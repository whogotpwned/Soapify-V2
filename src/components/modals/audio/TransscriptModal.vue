<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel"> Cancel
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <div id="audio-element-with-spoken-text">

      ------
      {{ speech_to_text }}
      ---

      <ion-accordion-group>
        <ion-accordion>
          <ion-item slot="header" color="light">
            <ion-label>Transcript</ion-label>
            <ion-button id="kopierenButton" @click="copySpokenToClipboard(speech_to_text)">Copy</ion-button>
          </ion-item>
          <div slot="content" class="ion-padding">{{speech_to_text}}</div>
        </ion-accordion>
      </ion-accordion-group>
    </div>
  </ion-content>
</template>


<script lang="ts" setup>

import {IonInput, modalController} from "@ionic/vue";
import copy from "copy-to-clipboard";
import Swal from "sweetalert2";
import {ref} from "vue";

const props = defineProps( {
  speech_to_text: String
})


const cancel = () => modalController.dismiss(null, 'cancel');

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

function copySpokenToClipboard(spoken: string) {
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

</script>