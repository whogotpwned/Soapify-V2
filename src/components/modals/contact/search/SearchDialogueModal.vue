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
    ion-input(v-model="titelSuche" label="Nach Titel suchen" label-placement="stacked" placeholder="Titel")
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
import {ref} from 'vue';

const titelSuche = ref();

const cancel = () => modalController.dismiss(null, 'cancel');

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