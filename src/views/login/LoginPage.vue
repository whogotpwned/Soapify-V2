<template lang="pug">
ion-page
  ion-loading(message="Logge ein ...")
  div(id="loginForm")
    ion-card
      ion-list
        ion-item
          ion-input(v-model="email" label="E-Mail-Adresse" type="email")
        ion-item
          ion-input(v-model="password" label="Passwort" type="password" @keyup.enter="login")

    ion-card
      ion-button(id="loginButton" expand="block" shape="round" @click="login") Einloggen
      div(id="registerLink" align="center")
        p Sie haben noch keinen Account?
        ion-button(fill="clear" @click="gotoRegister") Registrieren
</template>

<script lang="ts" setup>
import {IonButton, IonInput, IonItem, IonList, IonLoading, IonPage, loadingController} from '@ionic/vue';

import {ref} from 'vue';
import router from "@/router";
import {userSessionStore} from "@/lib/store/userSession";
import {error_toast, success_toast} from "@/views/toasts/messages";
import {nhost} from "@/lib/nhostSrc/client/nhostClient";
import {insertUser} from "@/lib/graphQL/mutations";
import {sha256} from "@/views/contacts/methods";

let email = ref('');
let password = ref('');
const store = userSessionStore();

const showLoading = async () => {
  const loading = await loadingController.create({
    message: 'Logge ein ...',
  });
  loading.present();
};

const stopLoading = async () => {
  await loadingController.dismiss();
};


function gotoRegister() {
  self.window.location.replace('/register')
}

/*
TODO: AuthApiError catchen

 */
async function login() {
  await showLoading();

  try {
    const signInResult = await nhost.auth.signIn({
      email: email.value,
      password: password.value
    })

    const signInSuccessful = signInResult.error ? false : true
    const emailUnverified = !signInResult.session.user.emailVerified;

    if (signInSuccessful) {
      if (emailUnverified) {
        error_toast.fire({
          icon: 'error',
          title: 'E-Mail-Adresse noch nicht bestätigt'
        })
      } else {
        const userID = signInResult.session.user?.id
        const userEmail = signInResult.session.user.email
        const userAvatarUrl = signInResult.session.user.avatarUrl
        const userDisplayName = signInResult.session.user.displayName

        const anyContactInformationIsNull = [store.getSessionID, store.getEmail, store.getAvatarURL, store.getUsername]
            .some(ele => (ele === null || ele === "" || ele === undefined));

        if (anyContactInformationIsNull) {
          store.setUsername(userDisplayName);
          store.setSessionID(userID);
          store.setEmail(userEmail);
          store.setAvatarURL(userAvatarUrl);

          localStorage.setItem('soapifyAccessToken', signInResult.session?.accessToken);
          localStorage.setItem('soapifyRefreshToken', signInResult.session?.refreshToken);
        }

        const avatarHash = await sha256(userEmail);

        const insertUserResult = await nhost.graphql.request(insertUser, {
          user_id: userID,
          avatar_url: `https://gravatar.com/avatar/${avatarHash}`,
          username: userDisplayName,
          email: userEmail,
        });

        // listen for auth events (e.g. sign in, sign out, refresh)
        // set session based on the auth event
        nhost.auth.onAuthStateChanged((event, session) => {
          store.setSessionID(<string>nhost.auth.getUser()?.id);
        })

        if (insertUserResult.data) {
          success_toast.fire({
            icon: 'success',
            title: 'Erfolgreich eingeloggt'
          }).then(async () => {
            await router.push('/')
          })
        }
      }
    }
  } catch (e) {
    error_toast.fire({
      icon: 'error',
      title: 'Fehler beim Einloggen'
    });
  } finally {
    await resetSearchObject();
    await stopLoading();
  }
}

async function resetSearchObject() {
  store.setSearchObject({
    searchDetails: {
      titelsucheSelected: false,
      titelSuche: '',
      dateSearchStartingChecked: false,
      dateSearchStarting: '',
      dateSearchEndingChecked: false,
      dateSearchEnding: '',
    }
  })
}

</script>

<style scoped>
@import "./style.css";
</style>
