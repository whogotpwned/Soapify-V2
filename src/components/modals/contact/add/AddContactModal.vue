<template lang="pug">
ion-header
  ion-toolbar
    ion-buttons(slot="start")
      ion-button(color="medium" @click="cancel") Abbrechen
    ion-title Kontakt hinzufügen ...
    ion-buttons(slot="end")
      ion-button(:strong="true" @click="confirm") Hinzufügen

ion-content(class="ion-padding")
  ion-item
    ion-input(v-model="idSuche" label="Nach ID suchen" label-placement="stacked" placeholder="ID")
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

const idSuche = ref();

const cancel = () => modalController.dismiss(null, 'cancel');

function confirm() {

  const event = new CustomEvent('idContactSearch', {
    detail: {
      idSuche: idSuche.value,
    },
  });
  window.dispatchEvent(event);
  modalController.dismiss(null, 'confirm');
}
</script>