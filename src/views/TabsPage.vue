<template lang="pug">
ion-page
  ion-tabs
    ion-router-outlet
    ion-tab-bar(slot='bottom')
      ion-tab-button(href='/tabs/chats' tab='chats')
        ion-icon(:icon='chatbubbleEllipsesOutline' aria-hidden='true')
          ion-label Chats
      ion-tab-button(href='/tabs/dialogue' tab='dialogue')
        ion-icon(:icon='chatboxSharp' aria-hidden='true')
          ion-label Dialoge
      ion-tab-button(href='/tabs/contacts' tab='contacts')
        ion-icon(:icon='book' aria-hidden='true')
          ion-label Contacts
      ion-tab-button(href='/tabs/profile' tab='profile')
        ion-icon(:icon='settings' aria-hidden='true')
          ion-label Profile
</template>

<script lang="ts" setup>
import {IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/vue';
import {book, chatboxSharp, chatbubbleEllipsesOutline, settings,} from 'ionicons/icons';
</script>
