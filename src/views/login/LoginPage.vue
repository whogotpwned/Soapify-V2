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
import {supabase} from "@/lib/supabase/supabaseClient";
import router from "@/router";
import {userSessionStore} from "@/lib/store/userSession";
import {checkIfUserWithUIDExistsInUsersTable, getAvatarForID} from "@/lib/supabase/supabaseMethods";
import {error_toast, success_toast} from "@/views/toasts/messages";
import {getUserDetailsOfUserWithID} from "@/lib/supabase/supabaseMethods";
import {nhost} from "@/lib/nhostSrc/client/nhostClient";
import {gql} from "graphql-request";

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
    const emailUnverified = signInResult.session.user.emailVerified === false;


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

        console.log(userID)
        console.log(userEmail)
        console.log(userDisplayName)

        const anyContactInformationIsNull = [store.getSessionID, store.getEmail, store.getAvatarURL, store.getUsername]
            .some(ele => (ele === null || ele === "" || ele === undefined));

        if (anyContactInformationIsNull) {

          store.setUsername(userDisplayName);
          store.setSessionID(userID);
          store.setEmail(userEmail);
          store.setAvatarURL(userAvatarUrl);

        }
        const insertUsers = gql`
          mutation MyMutation {
            insert_userdetails_one(object: {email: "", id: 10, user_id: ""}, on_conflict: {constraint: users_pkey, update_columns: created_at}) {
              id
            }
          }`

        nhost.graphql.request(insertUsers).then((result) => {
          console.log(result);
        })


      }
    }

  } catch (e) {

  }


  /*
    try {


        checkIfUserWithUIDExistsInUsersTable(data.user?.id).then((exists) => {
          if (!exists) {
            supabase.from("users").insert([{
              email: email.value,
              user_id: data?.user?.id
            }]).then((result) => {
              console.log(result);
            })
          }
        })

        // initialize the userSession store
        const userSession = userSessionStore()
        // listen for auth events (e.g. sign in, sign out, refresh)
        // set session based on the auth event
        supabase.auth.onAuthStateChange((event, session) => {
          userSession.session = session
        })

        success_toast.fire({
          icon: 'success',
          title: 'Erfolgreich eingeloggt'
        }).then(async () => {
          await router.push('/')
        })

      }
    } catch (e) {
      error_toast.fire({
        icon: 'error',
        title: 'Ungültige Eingabe-Credentials.'
      })
    } finally {
      await stopLoading();
    }
  */
}
</script>

<style scoped>
@import "./style.css";
</style>
