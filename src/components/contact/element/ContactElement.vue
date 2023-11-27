<template lang="pug">
ion-item-sliding
  ion-item-options(side='start')
    ion-item-option(color='success')
      ion-icon(slot='icon-only' :icon='archive')
  ion-item(@click="openDialogue(user, user_id, email)")
    div(ref="htmlRef" class="onhover")
      div(class="image_container")
        img(:src="avatar" alt="avatar")

      ion-card-header
        ion-card-title {{ user }}
        ion-card-subtitle {{ user_id }}
        ion-card-subtitle {{ email }}

  ion-item-options(side='end')
    ion-item-option
      ion-icon(slot='icon-only' :icon='heart')
    ion-item-option(color='danger' @click="deleteContactElement(user_id)")
      ion-icon(slot='icon-only' :icon='trash')
</template>


<script lang="ts" setup>
import {IonButton, IonCard, IonCardHeader, IonCardTitle, IonIcon, modalController} from '@ionic/vue';
import {trashBinOutline} from "ionicons/icons";
import router from "@/router";
import {onMounted, ref} from "vue";
import {error_toast} from "@/views/toasts/messages";
import {trash, heart, archive} from "ionicons/icons";
import {userSessionStore} from "@/lib/store/userSession";
import {getCurrentDateTimestamp} from "@/views/dialogue/methods";
import ShowContactDetailsModal from "@/components/modals/contact/details/ShowContactDetailsModal.vue";
import {onLongPress} from "@vueuse/core";

const props = defineProps({
  user: String,
  avatar: String,
  user_id: String,
  email: String
});

const store = userSessionStore();
const htmlRef = ref<HTMLElement | null>(null)

function openDialogue(user, user_id, email) {
  try {
    const event = new CustomEvent('openDialogue', {
      detail: {
        user: user,
        user_id: user_id,
        email: email
      },
    });
    const avatarUrlForID = store.getAvatarUrlFromContactInformationForID(user_id);
    const lastAccessTimestamp = getCurrentDateTimestamp();

    if (!store.activeChatsContainChatWithID(user_id)) {
      const currentDialoguePartner = {
        user: user,
        user_id: user_id,
        email: email,
        avatarUrl: avatarUrlForID,
        lastAccessTimestamp: lastAccessTimestamp,
      }
      store.addToActiveChats(currentDialoguePartner)
      store.setCurrentDialoguePartner(currentDialoguePartner)
    } else {
      store.updateTimestampOfActiveChatWithID(user_id, lastAccessTimestamp);
    }
    store.setLastActiveChatWasWithID(user_id);

    window.dispatchEvent(event);
  } catch (e) {
    error_toast.fire({
      title: 'Error',
      text: "Dialog für Chat-Ansicht konnte nicht geöffnet werden"
    });
  } finally {
    router.push('/tabs/dialogue');
  }
}

function deleteContactElement(user_id) {
  try {
    const eventDelete = new CustomEvent('deleteUserWithId', {
      detail: {
        user_id: user_id,
      },
    });
    window.dispatchEvent(eventDelete);
  } catch (e) {
    error_toast.fire({
      title: 'Error',
      text: "Event zum Löschen des Nutzers konnte nicht veranlasst werden"
    });
  }
  store.resetCurrentDialoguePartner();
}

const openUserDetailsModal = async (avatar, user_id, email) => {
  const modal = await modalController.create({
    component: ShowContactDetailsModal,
    componentProps: {
      avatarUrl: avatar,
      userId: user_id,
      email: email
    }
  });
  modal.present();
};

onLongPress(htmlRef, () => {
  openUserDetailsModal(props.avatar, props.user_id, props.email);
})
</script>

<style scoped>
@import 'style.css';
</style>
