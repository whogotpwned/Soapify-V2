<template lang="pug">
ion-page
  ion-header
    ion-toolbar
      ion-title Kontakte
    ion-content(:fullscreen="true")
      ion-refresher(slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)")
        ion-refresher-content
      ion-header(collapse="condense")
        ion-toolbar
          ion-title(size="large") Contacts


      ion-list(lines="full")
        ion-item(v-for="contact in contacts" :key="contact")
          ion-label
            ContactElement(:avatar="contact.avatarSrc" :email="contact.email" :user="contact.username" :user_id="contact.user_id")

  ion-footer
    ion-toolbar
      ion-button(id="addButton" shape="round" @click="openAddContactModal")
        ion-icon(slot="icon-only" :icon="add")
</template>

<script lang="ts" setup>
import {
  alertController,
  IonContent,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  loadingController,
  onIonViewDidEnter
} from '@ionic/vue';
import ContactElement from "@/components/contact/element/ContactElement.vue";
import {add} from "ionicons/icons";
import {
  getAvatarForID,
  getUserDetailsOfUserWithID,
  checkIfUserExistsInAuth,
  getUserSession
} from "@/lib/supabase/supabaseMethods";
import {supabase} from "@/lib/supabase/supabaseClient";
import {onMounted, ref} from "vue";
import Swal from "sweetalert2";
import {modalController} from "@ionic/vue";
import AddContactModal from "@/components/modals/contact/add/AddContactModal.vue";
import {error_toast, success_toast} from "@/views/toasts/messages";
import {userSessionStore} from "@/lib/store/userSession";
import {presentAlert, presentSuccess} from "@/views/toasts/alerts";
import {nhost} from "@/lib/nhostSrc/client/nhostClient";
import {countNumberOfUsersWithId, getUser, getContactsOfUserWithId, countNumberOfContactsOfUserWithId} from "@/lib/graphQL/queries";
import {insertOneContact, deleteContactOfUserWithId} from "@/lib/graphQL/mutations";
import {sha256} from "@/views/contacts/methods";

const contacts = ref([] as Array<Object>);
const store = userSessionStore();

loadAllContacts();

const handleRefresh = (event: CustomEvent) => {
  loadAllContacts().then(() => {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 1000);
  })
};

async function refreshAllContactsFromNhost() {
  contacts.value = [];
  const contactsSearchResult = await nhost.graphql.request(getContactsOfUserWithId, {user_id: store.getSessionID});

  const numberOfContacts = contactsSearchResult.data.contacts.length;

  console.log("Number of Contact: ")
  console.log(numberOfContacts)

  // loop over all contacts
  for (let i = 0; i < numberOfContacts; i++) {
    console.log(i);

    const contactId = contactsSearchResult.data.contacts[i].contact;

    const userDetailsOfUserWithID = await nhost.graphql.request(getUser, {user_id: contactId});

    const contactDetails = {
      username: userDetailsOfUserWithID.data.userdetails[0] ? userDetailsOfUserWithID.data.userdetails[0].username : "",
      avatarSrc: userDetailsOfUserWithID.data.userdetails[0] ? userDetailsOfUserWithID.data.userdetails[0].avatar_url : "",
      user_id: userDetailsOfUserWithID.data.userdetails[0] ? userDetailsOfUserWithID.data.userdetails[0].user_id : "",
      email: userDetailsOfUserWithID.data.userdetails[0] ? userDetailsOfUserWithID.data.userdetails[0].email : ""
    }


    if (!store.contactsContainUserWithID(contactDetails.user_id)) {
      store.addToContactInformation(contactDetails);
    }

    contacts.value.push(contactDetails);
  }
}

async function refreshAllContactsFromStore() {
  contacts.value = [];
  for (let i = 0; i < store.getContactInformation.length; i++) {
    contacts.value.push(store.getContactInformation[i]);
  }
}


async function loadAllContacts()  {
  contacts.value = [];

  try {
    const numberOfContactsForUserWithIdResult = await nhost.graphql.request(countNumberOfContactsOfUserWithId,
        {user_id: store.getSessionID});

    const numberOfContactsOfUser = numberOfContactsForUserWithIdResult.data.contacts_aggregate.aggregate.count;

    if (store.getContactInformation.length < numberOfContactsOfUser) {
      console.log("From Nhost")
      await refreshAllContactsFromNhost();
    } else {
      console.log("From Store");
      await refreshAllContactsFromStore();
    }
  } catch (e) {
    console.log(e)
    error_toast.fire({
      icon: 'error',
      title: 'Fehler beim Laden der Kontakte'
    });
  }
}

function contactsContainContactWithID(id: string) {
  let i;
  for (i = 0; i < contacts.value.length; i++) {
    if (contacts.value[i].user_id === id) {
      return true;
    }
  }
  return false;
}

const openAddContactModal = async () => {
  const modal = await modalController.create({
    component: AddContactModal,
  });
  modal.present();
};

// listener to listen for event deleteUserWithId from contactElement.vue
window.addEventListener('deleteUserWithId', (event: any) => {
  Swal.fire({
    title: 'Kontakt und zugehörige Nachrichten löschen?',
    showCancelButton: true,
    confirmButtonText: 'Löschen',
    denyButtonText: `Don't save`,
    heightAuto: false
  }).then(async (result) => {
    if (result.isConfirmed) {
      const idToBeDeleted = event.detail.user_id;
      const contactInList = contactsContainContactWithID(idToBeDeleted);

      if (contactInList) {

        const deleteUserWithIdResult = await nhost.graphql.request(deleteContactOfUserWithId,
            {user_id: store.getSessionID, contact: idToBeDeleted});

        if (deleteUserWithIdResult.error) {
          error_toast.fire({
            icon: 'error',
            title: 'Fehler beim Löschen des Kontaktes'
          });
        } else {
          success_toast.fire({
            icon: 'success',
            title: 'Kontakt erfolgreich gelöscht'
          });

          // delete element from contact list where user_id matches idToBeDeleted
          contacts.value = contacts.value.filter((contact: any) => {
            return contact.user_id !== idToBeDeleted;
          });
          // delete element from store
          store.deleteContactInformationWithID(idToBeDeleted);
          // delete element from active chats
          store.deleteFromActiveChats(idToBeDeleted);
        }
      } else {
        error_toast.fire({
          icon: 'error',
          title: 'Kontakt existiert nicht ...'
        });
      }
    } else {
      error_toast.fire({
        icon: 'error',
        title: 'Löschung abgebrochen'
      });
    }
  });
});


async function queriedUserExists(targetUserID: string) {
  const result = await nhost.graphql.request(countNumberOfUsersWithId, {user_id: targetUserID});

  return result.data.userdetails_aggregate.aggregate.count > 0;
}


// listener to listen for event idContactSearch from addcontactModal.vue
window.addEventListener('idContactSearch', async (event: any) => {
  const idToBeAdded = event.detail.idSuche;

  const contactInList = contactsContainContactWithID(idToBeAdded);


  if (contactInList) {
    await presentAlert('Kontakt ist bereits in Liste ...')
    return;
  } else {

    const userExists = await queriedUserExists(idToBeAdded);

    if (userExists) {

      const getFriendshipHash = await sha256(`${store.getSessionID},${idToBeAdded}`);

      const insertContactResult = await nhost.graphql.request(insertOneContact,
          {
            contact: idToBeAdded,
            user_id: store.getSessionID,
            friendship_hash: getFriendshipHash
          });

      if (insertContactResult.error) {
        await presentAlert('Fehler beim Hinzufügen des Kontaktes');
        return;
      } else {
        await presentSuccess('Kontakt erfolgreich hinzugefügt');

        const getNewContactDetails = await nhost.graphql.request(getUser, {user_id: idToBeAdded});

        const newContact = {
          username: getNewContactDetails.data.userdetails[0].username,
          avatarSrc: getNewContactDetails.data.userdetails[0].avatar_url,
          user_id: getNewContactDetails.data.userdetails[0].user_id,
          email: getNewContactDetails.data.userdetails[0].email
        }

        contacts.value.push(newContact);

        if (!store.contactsContainUserWithID(newContact.user_id)) {
          store.addToContactInformation(newContact)
        }
      }
    }
  }
});
</script>

<style scoped>
@import './style.css';
</style>

