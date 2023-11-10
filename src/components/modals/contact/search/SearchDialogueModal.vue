<template lang="pug">
ion-header
  ion-toolbar
    ion-buttons(slot="start")
      ion-button(color="medium" @click="cancel") Abbrechen
    ion-title Suche ...
    ion-buttons(slot="end")
      ion-button(:strong="true" @click="confirm") Suchen

ion-content(class="ion-padding")
  div
    ion-item
      ion-grid
        ion-row
          ion-col(size="auto")
            input(type="radio" value="titleSearch" v-model="selectedSearchElement")
          ion-col(size="auto")
            p Titel:
          ion-col
            ion-input(v-model="titelSuche" )

    ion-item
      ion-grid
        ion-row
          ion-col(size="auto")
            input(type="radio" value="dateRangeSearch" v-model="selectedSearchElement")
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
import {userSessionStore} from "@/lib/store/userSession";

const store = userSessionStore();
const titelSuche = ref(store.getSearchObject.searchValue.titleSearch ? store.getSearchObject.searchValue.titleSearch : '');
const datumSuche = ref(getCurrentDateTimestampInDatepickerFormat());
const selectedSearchElement = ref(store.getSearchObject.searchKey);


const cancel = () => modalController.dismiss(null, 'cancel');

function confirm() {
  /* send event to parent component Tap1Page.vue */
  const event = new CustomEvent('search', {
    detail: {
      searchKey: selectedSearchElement.value,
      searchValue: {
        titleSearch: titelSuche.value,
        dateSearch: datumSuche.value
      }
    },


  });

  store.setSearchObject({
    searchKey: selectedSearchElement.value,
    searchValue: {
      titleSearch: titelSuche.value,
      dateSearch: datumSuche.value
    }
  })
  window.dispatchEvent(event);
  modalController.dismiss(null, 'confirm');
}
</script>

<style scoped>
@import "style.css";
</style>