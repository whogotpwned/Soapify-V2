<template lang="pug">
ion-item-sliding
  ion-item-options(side='start')
    ion-item-option(color='success')
      ion-icon(slot='icon-only' :icon='archive')
  ion-item(@click="openDialogueWithUser(contactUsername, contactUserID, contactEmail)")
    ion-grid
      ion-row
        ion-col(size="auto")
          ion-avatar(id="contactAvatar")
            img(:src="avatarSrc")
        ion-col
          div(v-if="contactUsername" class="contactUsername")
            ion-label {{contactUsername}}
          div(v-else)
            ion-label {{contactUserID}}
        //ion-col
        //  ion-label(id="lastTimestamp") [{{lastAccessTimestamp}}]

  ion-item-options(side='end')
    ion-item-option
      ion-icon(slot='icon-only' :icon='heart')
    ion-item-option(color='danger')
      ion-icon(slot='icon-only' :icon='trash' @click="deleteChat(contactUserID)")
</template>


<script lang="ts" setup>
import {ref} from 'vue';
import {IonAvatar, IonPage, IonLabel} from '@ionic/vue';
import {trash, heart, archive} from "ionicons/icons";
import router from "@/router";
import {userSessionStore} from "@/lib/store/userSession";
import {presentAlert, presentSuccess} from "@/views/toasts/alerts";
import Swal from "sweetalert2";
import {getCurrentDateTimestamp} from "@/views/dialogue/methods";

const props = defineProps({
  avatarSrc: String,
  contactUserID: String,
  contactUsername: String,
  contactEmail: String,
  lastAccessTimestamp: String
});

const store = userSessionStore();

function openDialogueWithUser(user: string, user_id: string, email: string) {

  try {
    const event = new CustomEvent('openDialogue', {
      detail: {
        user: user,
        user_id: user_id,
        email: email
      },
    });
    const lastAccessTimestamp = getCurrentDateTimestamp();
    store.updateTimestampOfActiveChatWithID(user_id, lastAccessTimestamp);
    store.setLastActiveChatWasWithID(user_id);
    window.dispatchEvent(event);

  } catch (e) {

  } finally {
    router.push('/tabs/dialogue');

  }
}



async function deleteChat(user_id: string) {
  Swal.fire({
    title: 'Chat mit Kontakt löschen?',
    showCancelButton: true,
    confirmButtonText: 'Löschen',
    denyButtonText: `Don't save`,
    heightAuto: false
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        store.deleteFromActiveChats(user_id);
        store.resetCurrentDialoguePartner();
        await presentSuccess("Chat erfolgreich gelöscht");
      } catch (e) {
        await presentAlert("Fehler beim Löschen des Chats");
      }
    } else {
      await presentAlert("Chat konnte nicht gelöscht werden");
    }
  })
}

</script>

<style>
@import "style.css";
</style>
