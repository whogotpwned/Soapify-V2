<template lang="pug">
ion-page
  ion-loading(message="Registriere ...")
  div(id="registerForm")
    ion-card
      ion-list(id="loginForm")
        ion-item
          ion-input(v-model="email" :label="strings.de.labels.email" type="email")

        ion-item
          ion-input(v-model="password" :label="strings.de.labels.password" type="password")

        ion-item
          ion-input(v-model="passwordRep" :label="strings.de.labels['password-repeat']" type="password")
    ion-card
      ion-button(id="loginButton" expand="block" shape="round" @click="signUp") Registrieren
      div(id="registerLink" align="center")
        p {{ strings.de.registration["have-account-question"] }}
        ion-button(fill="clear") {{ strings.de.labels.login }}
</template>

<script lang="ts" setup>
import {IonButton, IonInput, IonItem, IonList, IonLoading, IonPage} from "@ionic/vue";
import {error_toast, success_toast} from "@/views/toasts/messages";
import router from "@/router";
import {nhost} from "@/lib/nhostSrc/client/nhostClient";
import {ref} from "vue";
import {strings} from "@/lib/strings";
import {constants} from "@/lib/constants";

let email = ref('');
let password = ref('');
let passwordRep = ref('');

function passwordDoesNotMatchPasswordRep() {
  if (password.value !== passwordRep.value) {
    try {
      error_toast.fire({
        icon: 'error',
        title: strings.de.registration["passwords-mismatch"]
      });
    } catch (e) {
      console.log("Toast-Nachricht konnte nicht versendet werden.");
    } finally {
      password.value = '';
      passwordRep.value = '';
    }
    return true;
  } else {
    return false;
  }
}


function signUp() {
  if (passwordDoesNotMatchPasswordRep()) {
    return;
  }
  nhost.auth.signUp({
    email: email.value,
    password: password.value
  }).then((res) => {
    if (res.error) {
      if (res.error?.status === constants.errors["account-exists"]) {
        error_toast.fire({
          icon: 'error',
          title: strings.de.registration["account-exists"],
        });
      } else if (res.error.status === constants.errors["password-too-short"]) {
        error_toast.fire({
          icon: 'error',
          title: strings.de.registration["password-too-short"]
        });
      } else if (res.error.status === constants.errors["invalid-email-format"]) {
        error_toast.fire({
          icon: 'error',
          title: strings.de.registration["invalid-email-format"]
        });
      }
    } else {
      success_toast.fire({
        icon: 'success',
        title: strings.de.registration["check-mailbox"]
      });
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  });
}
</script>


<style scoped>
@import './style.css';
</style>
