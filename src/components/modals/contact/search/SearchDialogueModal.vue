<template lang="pug">
ion-header
  ion-toolbar
    ion-buttons(slot="start")
      ion-button(color="medium" @click="cancel") Abbrechen
    ion-title Suche ...
    ion-buttons(slot="end")
      ion-button(:strong="true" @click="confirm") Suchen

ion-content(class="ion-padding")
  ion-item
    ion-grid
      ion-row
        ion-col
          p Titel:
        ion-col
          ion-input(v-model="titelSuche" )

  ion-item
    ion-grid
      ion-row
        ion-col
          p Datum: {{ datumSuche }}
        ion-col
          ion-datetime-button(datetime='datetime')
          ion-modal(:keep-contents-mounted='true')
            ion-datetime(v-model="datumSuche" :value="datumSuche")#datetime
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
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/vue';
import {getCurrentDateTimestamp, getCurrentDateTimestampInDatepickerFormat} from "@/views/dialogue/methods";
import {ref} from 'vue';

const titelSuche = ref();
const datumSuche = ref(getCurrentDateTimestampInDatepickerFormat());

const cancel = () => modalController.dismiss(null, 'cancel');

const check = () => {
  console.log(datumSuche.value)
}

function confirm() {
  /* send event to parent component Tap1Page.vue */
  const event = new CustomEvent('search', {
    detail: {
      titleSearch: titelSuche.value,
    },
  });
  window.dispatchEvent(event);
  modalController.dismiss(null, 'confirm');
}
</script>