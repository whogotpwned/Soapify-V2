<template lang="pug">
ion-page

  ion-loading(message="Lade Kontakte ...")

  ion-header
    ion-toolbar
      ion-title Kontakte
    ion-content(:fullscreen="true")
      ion-refresher(slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)")
        ion-refresher-content
      ion-header(collapse="condense")
        ion-toolbar
          ion-title(size="large") Contacts

      div(v-if="contacts.length == 0" id="alone")
        div(align="center")
          h1(id="forever-alone-head") Du hast 0 Freunde auf Soapify
        iframe.giphy-embed(src='/public/gifs/forever_alone.gif' width='480' height='324' frameborder='0' allowfullscreen='')

      div(v-else)
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
  getContactsOfUserWithId,
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
import {countNumberOfUsersWithId, getUser} from "@/lib/graphQL/queries";
import {insertOneContact} from "@/lib/graphQL/mutations";
import {sha256} from "@/views/contacts/methods";

const contacts = ref([] as Array<Object>);
const store = userSessionStore();

const showLoading = async () => {
  const loading = await loadingController.create({
    message: 'Lade Kontakte ...',
  });
  loading.present();
};

const stopLoading = async () => {
  await loadingController.dismiss();
};


onIonViewDidEnter(() => {
  //loadAllContacts();
});

//loadAllContacts();

const handleRefresh = (event: CustomEvent) => {
  loadAllContacts().then(() => {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 1000);
  })
};

// async function loadAllContacts() {
//   contacts.value = []
//
//   try {
//     if (store.getContactInformation.length == 0) {
//       const contactsOfUserWithID = await getContactsOfUserWithId(store.getSessionID);
//
//       for (const element of contactsOfUserWithID) {
//
//         let userDetailsOfUserWithID = await getUserDetailsOfUserWithID(element.contact);
//
//         const avatar = await getAvatarForID(element.contact);
//
//         if (!audioElementsContainElementWithUerID(userDetailsOfUserWithID.user_id)) {
//
//           const contactDetails = {
//             username: userDetailsOfUserWithID.username,
//             avatarSrc: avatar,
//             user_id: userDetailsOfUserWithID.user_id,
//             email: userDetailsOfUserWithID.email
//           }
//
//           contacts.value.push(contactDetails);
//           store.addToContactInformation(contactDetails);
//         }
//       }
//     } else {
//       contacts.value = store.getContactInformation;
//
//     }
//   } catch (e) {
//     await error_toast.fire({
//       title: 'Error',
//       text: "Kontakte konnten nicht geladen werden"
//     });
//   }
// }

function audioElementsContainElementWithUerID(id) {
  let containsElement = false;
  let i;
  for (i = 0; i < contacts.value.length; i++) {
    if (contacts.value[i].user_id === id) {
      return true;
    }
  }
  return containsElement;
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
        getUserSession().then((result) => {
          supabase.from('contacts').delete().match({
            user_id: result,
            contact: idToBeDeleted
          }).then(async (result) => {
            if (result.error) {
              await presentAlert('Fehler beim Lösches des Kontakts');
            } else {
              await presentSuccess('Kontakt erfolgreich gelöscht')
            }
          }).then(() => {
            supabase.from('chats').delete().match({
              user_id: result,
              contact: idToBeDeleted
            }).then(() => {
              supabase.from('chats').delete().match({
                user_id: idToBeDeleted,
                contact: result
              }).then(async (result) => {
                if (result.error) {
                  await presentAlert('Fehler beim Löschen der Nachrichten');
                }
              });
            });
          });
        });
        // delete element from contact list where user_id matches idToBeDeleted
        contacts.value = contacts.value.filter((contact: any) => {
          return contact.user_id !== idToBeDeleted;
        });
        // delete element from store
        store.deleteContactInformationWithID(idToBeDeleted);
        // delete element from active chats
        store.deleteFromActiveChats(idToBeDeleted);
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


      }


    }

    // getUserSession().then((result) => {
    //   checkIfUserExistsInAuth(idToBeAdded).then(async (exists) => {
    //     if (exists) {
    //       const {_, error} = await supabase.from('contacts').insert([
    //         {
    //           user_id: result,
    //           contact: event.detail.idSuche
    //         }
    //       ])
    //       if (error) {
    //         await presentAlert('Fehler beim Hinzufügen des Kontaktes');
    //       } else {
    //         await presentSuccess('Kontakt erfolgreich hinzugefügt');
    //       }
    //       getUserDetailsOfUserWithID(idToBeAdded).then(async (u) => {
    //         const avatar = await getAvatarForID(idToBeAdded);
    //         contacts.value.push({
    //           username: u.username,
    //           avatarSrc: avatar,
    //           user_id: u.user_id,
    //           email: u.email
    //         });
    //         if (!store.contactsContainUserWithID(u.user_id)) {
    //           store.addToContactInformation({
    //             username: u.username,
    //             avatarSrc: avatar,
    //             user_id: u.user_id,
    //             email: u.email
    //           })
    //         }
    //       });
    //    } else {
    //      await presentAlert('Kontakt scheint nicht zu existieren ...');
    //   }
    //  })
    //});
  }
});
</script>

<style scoped>
@import './style.css';
</style>

