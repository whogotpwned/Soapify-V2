<template lang="pug">
ion-page
  ion-loading(message="Registriere ...")
  div(id="registerForm")
    ion-card
      ion-list(id="loginForm")
        ion-item
          ion-input(v-model="email" label="E-Mail-Adresse" type="email")

        ion-item
          ion-input(v-model="password" label="Passwort" type="password")

        ion-item
          ion-input(v-model="passwordRep" label="Passwort Wdh." type="password"
                     @keyup.enter="passwordAndRepMatch")

    ion-card
      ion-button(id="loginButton" expand="block" shape="round" @click="passwordAndRepMatch") Registrieren
      div(id="registerLink" align="center")
        p Sie haben schon einen Account?
        ion-button(fill="clear" @click="gotoLogin") Einloggen
</template>

<script lang="ts" setup>
import {IonButton, IonInput, IonItem, IonList, IonLoading, IonPage, loadingController} from "@ionic/vue";
import {ref} from "vue";
import {useSignUpEmailPassword} from "@nhost/vue";
import {error_toast, success_toast} from "@/views/toasts/messages";
import router from "@/router";

let email = ref('');
let password = ref('');
let passwordRep = ref('');
const { signUpEmailPassword, needsEmailVerification } = useSignUpEmailPassword()


const showLoading = async () => {
  const loading = await loadingController.create({
    message: 'Registriere ...',
  });
  loading.present();
};

const stopLoading = async () => {
  await loadingController.dismiss();
};

function gotoLogin() {
  self.window.location.replace('/login')
}

async function signUp() {
  await showLoading();

  try {
    const {isSuccess} = await signUpEmailPassword(email, password)
    if (isSuccess) {
      success_toast.fire({
        icon: 'success',
        title: 'Bitte bestätigen Sie Ihre E-Mail-Adresse'
      }).then(() => {
        setTimeout(() => {
          self.window.location.replace('/login');
        }, 2000);
      })
    }
  } catch (e) {
    error_toast.fire({
      icon: 'error',
      title: 'Registrierung fehlgeschlagen'
    })
  } finally {
    await stopLoading();
  }

}


async function passwordAndRepMatch() {
  if (password.value === passwordRep.value) {
    signUp()
  } else {
    error_toast.fire({
      icon: 'error',
      title: 'Passwörter stimmen nicht überein'
    })
  }
}
</script>

<style scoped>
@import './style.css';
</style>
