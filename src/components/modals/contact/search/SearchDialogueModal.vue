<template lang="pug">
ion-header
  ion-toolbar
    ion-buttons(slot="start")
      ion-button(color="medium" @click="cancel") Abbrechen
    ion-title Suche ...
    ion-buttons(slot="end")
      ion-button(:strong="true" @click="confirm") Suchen

ion-content(class="ion-padding")
  div(id="search-table")
    ion-item
      ion-grid
        ion-row
          ion-col(size="auto")
            input(type="radio" :value="true" v-model="titelsucheSelected")
          ion-col(size="auto")
            p Titel:
          ion-col
            ion-input(v-model="titelSuche")

    ion-item
      ion-grid
        ion-row
          ion-col(size="auto")
            input(type="checkbox" v-model="dateSearchStartingChecked")
          ion-col
            p Von: {{ dateSearchStarting }}
          ion-col
            ion-datetime-button(datetime='datetimeStarting')
            ion-modal(:keep-contents-mounted='true')
              ion-datetime(v-model="dateSearchStarting" :value="dateSearchStarting")#datetimeStarting

    ion-item
      ion-grid
        ion-row
          ion-col(size="auto")
            input(type="checkbox"  v-model="dateSearchEndingChecked")
          ion-col
            p Bis: {{ dateSearchEnding }}
          ion-col
            ion-datetime-button(datetime='datetimeEnding')
            ion-modal(:keep-contents-mounted='true')
              ion-datetime(v-model="dateSearchEnding" :value="dateSearchEnding")#datetimeEnding

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
import {userSessionStore} from "@/lib/store/userSession";

const store = userSessionStore();
const titelSuche = ref(store.getSearchObject.searchDetails.titelSuche ? store.getSearchObject.searchDetails.titelSuche : '');
const dateSearchStarting = ref(store.getSearchObject.searchDetails.dateSearchStarting ? store.getSearchObject.searchDetails.dateSearchStarting : getCurrentDateTimestampInDatepickerFormat());
const dateSearchStartingChecked = ref(store.getSearchObject.searchDetails.dateSearchStartingChecked ? store.getSearchObject.searchDetails.dateSearchStartingChecked : false);
const dateSearchEnding = ref(store.getSearchObject.searchDetails.dateSearchEnding ? store.getSearchObject.searchDetails.dateSearchEnding : getCurrentDateTimestampInDatepickerFormat());
const dateSearchEndingChecked = ref(store.getSearchObject.searchDetails.dateSearchEndingChecked ? store.getSearchObject.searchDetails.dateSearchEndingChecked : false);
const titelsucheSelected = ref(store.getSearchObject.searchDetails.titelsucheSelected ? store.getSearchObject.searchDetails.titelsucheSelected : false);



const cancel = () => modalController.dismiss(null, 'cancel');

function confirm() {
  /* send event to parent component Tap1Page.vue */
  const event = new CustomEvent('search', {
    detail: {
      titelsucheSelected: titelsucheSelected.value,
      titelSuche: titelSuche.value,
      dateSearchStartingChecked: dateSearchStartingChecked.value,
      dateSearchStarting: dateSearchStarting.value,
      dateSearchEndingChecked: dateSearchEndingChecked.value,
      dateSearchEnding: dateSearchEnding.value,
    },


  });

  store.setSearchObject({
    searchDetails: {
      titelsucheSelected: titelsucheSelected.value,
      titelSuche: titelSuche.value,
      dateSearchStartingChecked: dateSearchStartingChecked.value,
      dateSearchStarting: dateSearchStarting.value,
      dateSearchEndingChecked: dateSearchEndingChecked.value,
      dateSearchEnding: dateSearchEnding.value,
    }
  })
  window.dispatchEvent(event);
  modalController.dismiss(null, 'confirm');
}
</script>

<style scoped>
@import "style.css";
</style>