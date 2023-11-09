import {defineStore} from 'pinia';
import {getContactsOfUserWithId} from "@/lib/supabase/supabaseMethods";

export const userSessionStore = defineStore({
    id: 'soapify', state: () => ({
        sessionID: '', email: '', avatarURL: '', username: '', contactInformation: [], activeChats: [], lastActiveChatWasWithID: '', accessToken: '', refreshToken: '', currentDialoguePartner: {"dialogues": []}
    }), getters: {
        getSessionID: (state) => state.sessionID, getEmail: (state) => state.email, getAvatarURL: (state) => state.avatarURL, getUsername: (state) => state.username, getContactInformation: (state) => state.contactInformation, getActiveChats: (state) => state.activeChats, getLastActiveChatWasWithID: (state) => state.lastActiveChatWasWithID, getCurrentDialoguePartner: (state) => state.currentDialoguePartner
    }, actions: {
        setSessionID(sessionID: string) {
            this.sessionID = sessionID;
        }, setEmail(email: string) {
            this.email = email;
        }, setAvatarURL(avatarURL: string) {
            this.avatarURL = avatarURL;
        }, resetAvatarURL() {
            this.avatarURL = '';
        }, setUsername(username: string) {
            this.username = username;
        }, setContactInformation(contactInformation: object) {
            this.contactInformation = contactInformation;
        }, addToContactInformation(contactInformationObject: object) {
            this.contactInformation.push(contactInformationObject);
        }, getAvatarUrlFromContactInformationForID(targetID: string) {
            return this.contactInformation.filter(e => e.user_id == targetID)[0].avatarSrc
        }, resetUsername(username: string) {
            this.username = username;
        }, deleteAvatarUrl() {
            this.avatarURL = '';
        }, deleteContactInformationWithID(targetID: string) {
            this.setContactInformation(this.contactInformation.filter((contact: any) => {
                return contact.user_id !== targetID;
            }));
        }, contactsContainUserWithID(targetID: string) {
            return this.contactInformation.filter(e => e.user_id === targetID).length > 0;
        }, setActiveChats(activeChats: object) {
            this.activeChats = activeChats;
        }, deleteActiveChats() {
            this.activeChats = [];
        }, addToActiveChats(newChat: object) {
            this.activeChats.push(newChat);
        }, deleteFromActiveChats(toBeDeletedDialoguePartnerID: string) {
            this.setActiveChats(this.activeChats.filter((activeChat: any) => {
                return activeChat.user_id !== toBeDeletedDialoguePartnerID;
            }))
            if (this.lastActiveChatWasWithID === toBeDeletedDialoguePartnerID) {
                this.resetLastActiveChatWasWithID()
            }
        }, activeChatsContainChatWithID(targetID: string) {
            return this.activeChats.filter(e => e.user_id === targetID).length > 0
        }, setLastActiveChatWasWithID(lastActiveChatWasWithID: string) {
            this.lastActiveChatWasWithID = lastActiveChatWasWithID;
        }, resetLastActiveChatWasWithID() {
            this.lastActiveChatWasWithID = '';
        }, updateTimestampOfActiveChatWithID(targetID: string, timestamp: string) {
            const objIndex = this.getActiveChats.findIndex((obj => obj.user_id == targetID));
            this.activeChats[objIndex].lastAccessTimestamp = timestamp
        }, setCurrentDialoguePartner(currentDialoguePartner: object) {
            this.currentDialoguePartner = currentDialoguePartner;
        }, resetCurrentDialoguePartner() {
            this.currentDialoguePartner = {};
        }, updateCurrentDialoguePartnerAttribute(attribute: string, value: string) {
            this.currentDialoguePartner[attribute] = value;
        }, addDialogueToCurrentDialoguePartner(dialogue: object) {
            this.currentDialoguePartner["dialogues"].push(dialogue);
        }, setDialoguesOfCurrentDialoguePartner(dialogues: object) {
            this.currentDialoguePartner["dialogues"] = dialogues;
        }, updateDialogueTitleOfDialogueWithId(chatID: string, newTitle: string) {
            const objIndex = this.currentDialoguePartner["dialogues"].findIndex((obj => obj["chat_id"] == chatID));
            this.currentDialoguePartner["dialogues"][objIndex]["title"] = newTitle
        }, deleteDialogueWithId(chatID: string) {
            this.currentDialoguePartner["dialogues"] = this.currentDialoguePartner["dialogues"].filter((dialogue: any) => {
                return dialogue.chat_id !== chatID;
            })
        }, addChipToCurrentDialoguePartner(chip: string, chat_id: string) {
            this.currentDialoguePartner["dialogues"] = this.currentDialoguePartner["dialogues"].map((dialogue: any) => {

                if (dialogue.chat_id === chat_id) {
                    // extend object by tag
                    dialogue["chips"].push(chip);
                }
                return dialogue;
            });
        }, getChipsOfDialoguePartnerFromChatWithChatId(chat_id: string) {

            const objIndex = this.currentDialoguePartner["dialogues"].findIndex((obj => obj["chat_id"] == chat_id));
            return this.getCurrentDialoguePartner["dialogues"][objIndex]["chips"];

        }

    }, persist: true,
});