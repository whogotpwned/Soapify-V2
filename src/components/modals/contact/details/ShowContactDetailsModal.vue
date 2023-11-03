<template lang="pug">
ion-header
  ion-toolbar
    ion-buttons(slot="start")
      ion-button(color="medium" @click="cancel") Abbrechen
    ion-title Kontakt Details

ion-content(class="ion-padding")
  img(:src="avatarUrl")

  div(align="center" id="contactDetails")

    ion-list
      ion-item(@click="copyToClipboard(userId)")
        ion-icon(aria-hidden="true" :icon="idCardOutline" slot="start")
        ion-label {{ userId }}
      ion-item(@click="copyToClipboard(email)")
        ion-icon(aria-hidden="true" :icon="mailOutline" slot="start")
        ion-label {{ email }}
      ion-item
        ion-icon(aria-hidden="true" :icon="logoPaypal" slot="start")
        ion-label Foobar

</template>

<script lang="ts" setup>
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar,
  modalController,
} from '@ionic/vue';
import {airplane, idCardOutline, mailOutline, logoPaypal} from 'ionicons/icons';
import {ref} from 'vue';
import copy from 'copy-to-clipboard';
import {presentSuccess, presentAlert} from "@/views/toasts/alerts";

const props = defineProps({
  avatarUrl: String,
  userId: String,
  email: String
});

const cancel = () => modalController.dismiss(null, 'cancel');

function copyToClipboard(text: string) {
  try {
    copy(text);
    presentSuccess('Kopiert!');
  } catch (e) {
    presentAlert('Kopieren fehlgeschlagen!');
  }
}


</script>


<style scoped>
@import './style.css';
</style>
