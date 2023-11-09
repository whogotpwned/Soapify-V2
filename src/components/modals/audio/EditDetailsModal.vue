<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel"> Cancel
        </ion-button>

      </ion-buttons>


      <ion-buttons slot="end">
        <ion-button :strong="true" @click="confirm">Save</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <div>
      <ion-item>
        <ion-input v-model="localTitle" :value="localTitle" label="Title" label-placement="stacked"></ion-input>
      </ion-item>
    </div>


    <div id="chipsInEditDetailsModel">
      <ion-item>
        <ion-input v-model="specificChip" label="Chips" label-placement="stacked" @keyup.enter="addChip"></ion-input>
      </ion-item>
    </div>

    <div>
      <ion-item v-for="chip in chips" id="audioChip">
        <ion-chip color="tertiary">
          {{ chip }}
        </ion-chip>
      </ion-item>
    </div>

  </ion-content>
</template>


<script lang="ts" setup>
import {IonInput, modalController} from "@ionic/vue";
import {ref} from "vue";
import {nhost} from "@/lib/nhostSrc/client/nhostClient";
import {insertChipInChipsTable, updateChipsInChatsTable, updateTitleInChatsTable} from "@/lib/graphQL/mutations";
import {userSessionStore} from "@/lib/store/userSession";
import {getChipsOfChatId} from "@/lib/graphQL/queries";
import Swal from "sweetalert2";

const props = defineProps({
  id: String,
  title: String,
  aChips: [],
  isSender: Boolean
});

const localTitle = ref(props.title);
let specificChip = ref('');
const chips = ref([]);


const store = userSessionStore();

const cancel = () => modalController.dismiss(null, 'cancel');

chips.value = store.getChipsOfDialoguePartnerFromChatWithChatId(props.id);

async function changeTitle() {

  const updateTitleInChatsTableResult = await nhost.graphql.request(updateTitleInChatsTable, {
    chat_id: props.id,
    user_id: store.getSessionID,
    title: localTitle.value
  })

  const event = new CustomEvent('editDetailsModalChangesTitle', {
    detail: {
      chat_id: props.id,
      user_id: store.getSessionID,
      title: localTitle.value
    }
  })
  window.dispatchEvent(event)


  store.updateDialogueTitleOfDialogueWithId(props.id, localTitle.value);
}

function hasWhiteSpace(s: any) {
  return /\s/g.test(s);
}

function addChip() {
  checkIfTagExists(specificChip.value).then(async (exists) => {
    if (exists) {
      specificChip.value = '';
    } else {
      if (specificChip.value === '') {
        specificChip.value = '';
        return;
      }
      try {
        if (hasWhiteSpace(specificChip.value)) {
          Swal.fire({
            title: 'Fehler',
            text: 'Keine leeren Eingaben oder Leerzeichen erlaubt',
            icon: 'error',
            confirmButtonText: 'Cool',
            heightAuto: false
          })
          specificChip.value = '';
          return;
        }

        //chips.value.push(specificChip.value);
        store.addChipToCurrentDialoguePartner(specificChip.value, props.id);

        const event = new CustomEvent('addChip', {
          detail: {
            tag: specificChip.value,
            id: props.id,
            isSender: props.isSender
          },
        });
        window.dispatchEvent(event);

      } catch (e) {
        Swal.fire({
          title: 'Fehler :(',
          text: 'Hinzufügen fehlerhaft',
          icon: 'error',
          confirmButtonText: 'Cool',
          heightAuto: false
        })
      } finally {
        specificChip.value = '';
      }
    }
  });
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


const confirm = () => {
  changeTitle();
  modalController.dismiss(null, 'confirm')
}


</script>

<style scoped>
@import 'styleEditDetailsModal.css';

</style>