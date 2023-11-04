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
          div(v-if="avatarURL" @click="deleteAvatar")
            ion-avatar(style="width: 100px")
              img(:src="avatarURL"  class="avatarIMG")
          div(v-else)
            ion-img(class="avatarIMG" src="../../resources/no_avatar.png")

        input(accept="image/*" class="custom-file-upload" type="file" @change="handleFileUpload")

    ExploreContainer(name="Tab 3 page")
  ion-footer
    ion-toolbar
      ion-button(id="logoutButton" shape="round" @click="logoutSupabase")
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

const personalID = ref('');
const personalUsername = ref('');
const personalEmail = ref('');
const avatarURL = ref('');
const store = userSessionStore();

async function updateAvatar() {
  store.setAvatarURL(nhost.storage.getPublicUrl({fileId: store.getSessionID}));
  avatarURL.value = store.getAvatarURL;
  console.log(avatarURL.value);
}

async function deleteAvatar() {
  nhost.storage.delete({fileId: store.getSessionID}).then(async () => {
    await updateAvatar();
  }).then(() => {
    avatarURL.value = "";
  })
}

function resetFileInputField() {
  const file =
      document.querySelector('.file');
  file.value = '';
}

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


const handleFileUpload = async (event: any) => {
  const file = event.target.files[0];

  console.log(file);

  // console.log(nhost.storage.getPublicUrl({fileId: store.getSessionID}))

  const x = await nhost.storage.upload({file, name: 'avatar.jpeg', id: store.getSessionID, bucketId: 'avatars',
    uploadedByUserId: 'sadasdsad'})


  console.log(x);

  await updateAvatar();
  // supabase.storage
  //     .from('avatars')
  //     .upload(`${store.getSessionID}/avatar.jpeg`, file, {
  //       cacheControl: '3600',
  //       upsert: true,
  //     }).then(() => {
  //   updateAvatar();
  // })
};

async function changeUsername() {

  console.log(personalUsername.value)

  try {
    supabase.from('users')
        .update({
          username: personalUsername.value
        })
        .eq('user_id', store.getSessionID)
        .then(async (result) => {
          console.log(result)
          // duplicate username error
          if (result.error?.code === "23505") {
            error_toast.fire({
              icon: 'error',
              title: 'Nutzername existiert bereits'
            });
          } else if (!result.error) {
            store.resetUsername(personalUsername.value)
          }
        })
  } catch (e) {
    error_toast.fire({
      icon: 'error',
      title: 'Fehler beim Ändern des Nutzernamens'
    });
  }
}


async function logoutSupabase() {
  const {error} = await supabase.auth.signOut();
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
