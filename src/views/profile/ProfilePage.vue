<template lang="pug">
ion-page
  ion-loading(message="Lade Profil ...")
  ion-header
    ion-toolbar
      ion-title Profil

  ion-content(:fullscreen="true")
    ion-list(:inset="true")


      ion-item
        ion-icon(aria-hidden="true" :icon="idCardOutline" slot="start")
        ion-label {{ personalID }}

      ion-item
        ion-icon(aria-hidden="true" :icon="mailOutline" slot="start")
        ion-label {{ personalEmail }}

      ion-item
        ion-icon(aria-hidden="true" :icon="personOutline" slot="start")
        ion-input(v-model="personalUsername" @keyup.enter="changeUsername" :value="personalUsername" placeholder="Nutzername")

    ion-header(collapse="condense")
      ion-toolbar
        ion-title(size="large") {{ personalUsername }}

    ion-card(class="avatar")
      ion-card-content
        h1(class="center") Avatar
        ion-avatar
          div(v-if="avatarURL")
            ion-avatar(style="width: 100px")
              img(:src="avatarURL"  class="avatarIMG")
          div(v-else)
            ion-img(class="avatarIMG" src="../../resources/no_avatar.png")

    ExploreContainer(name="Tab 3 page")
  ion-footer
    ion-toolbar
      ion-button(id="logoutButton" shape="round" @click="logout")
        ion-icon(slot="icon-only" :icon="logOut")
</template>

<script lang="ts" setup>
import {IonContent, IonHeader, IonIcon, IonLoading, IonInput, IonPage, IonTitle, IonToolbar, loadingController} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import {ref} from "vue";
import {supabase} from "@/lib/supabase/supabaseClient";
import Swal from "sweetalert2";
import {logOut, idCardOutline, personOutline, mailOutline} from "ionicons/icons";
import {checkFileExists} from "@/lib/supabase/supabaseMethods";
import {error_toast, info_toast, success_toast} from "@/views/toasts/messages";
import {userSessionStore} from "@/lib/store/userSession";
import {nhost} from "@/lib/nhostSrc/client/nhostClient";
import {updateUsername} from "@/lib/graphQL/mutations";

const personalID = ref('');
const personalUsername = ref('');
const personalEmail = ref('');
const avatarURL = ref('');
const store = userSessionStore();

async function getUsername() {

  if (!store.getUsername) {
    personalUsername.value = '';
    info_toast.fire({
      title: 'Info',
      text: "Vergib dir einen Nutzernamen!"
    });
  } else {
    personalUsername.value = store.getUsername;
  }
}

async function getUserID() {
  personalID.value = store.getSessionID;
}

function getAvatarURL() {
  avatarURL.value = store.getAvatarURL;
}

function getPersonalEmail() {
  personalEmail.value = store.getEmail;
}


getAvatarURL();
getUsername();
getPersonalEmail();
getUserID();


async function changeUsername() {
  try {

    const updateUsernameResult = await nhost.graphql.request(updateUsername, {
      user_id: store.getSessionID,
      username: personalUsername.value
    })

    if (updateUsernameResult.error) {
      error_toast.fire({
        icon: 'error',
        title: 'Fehler beim Ändern des Nutzernamens'
      });
    } else {
      store.setUsername(personalUsername.value);
      success_toast.fire({
        icon: 'success',
        title: 'Nutzername erfolgreich geändert'
      });
    }
  } catch (e) {
    error_toast.fire({
      icon: 'error',
      title: 'Fehler beim Ändern des Nutzernamens'
    });
  }
}


async function logout() {
  const {error} = await nhost.auth.signOut();

  if (error) {
    console.log(error);
  } else {
    success_toast.fire({
      icon: 'success',
      title: 'Logout erfolgreich'
    }).then(() => {
      self.window.location.replace('/login');
    })
  }
}

</script>

<style scoped>
@import './style.css';
</style>
