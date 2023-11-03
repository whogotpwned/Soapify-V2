<template lang="pug">
ion-page
  ion-loading(message="Lade Kontakte ...")

  ion-header
    ion-toolbar
      ion-title Chats
    ion-content(:fullscreen="true")

      ion-refresher(slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)")
        ion-refresher-content

      ion-list(id="chatsList")
        ion-item(v-for="chat in store.getActiveChats" :key="chat.user_id" id="chatElement")
          ChatElement(:avatarSrc="chat.avatarUrl" :lastAccessTimestamp="chat.lastAccessTimestamp" :contactUserID="chat.user_id" :contactUsername="chat.user" :contactEmail="chat.email")

      div(v-if="store.getActiveChats.length == 0" )
        div(align="center")
          h1(id="forever-alone-head") 🧐
          h3 Nothing to see here ...

</template>

<script lang="ts" setup>
import {IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar} from '@ionic/vue';
import ChatElement from "@/components/chats/ChatElement.vue";
import {userSessionStore} from "@/lib/store/userSession";

const store = userSessionStore();


</script>


<style lang="scss" scoped>
@import './style.css';
</style>





