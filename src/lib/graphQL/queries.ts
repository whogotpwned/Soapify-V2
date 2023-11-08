import {gql} from "graphql-request";

export const getUser = gql`
    query getUser($user_id: uuid!) {
        userdetails(
            limit: 1,
            where: {
                user_id: {
                    _eq: $user_id
                }
            }) {
            id
            username
            user_id
            last_login
            email
            created_at
            avatar_url
        }
    }`

export const countNumberOfUsersWithId = gql`
    query countNumberOfUsersWithIds($user_id: uuid!) {
        userdetails_aggregate(where: {user_id: {_eq: $user_id}}) {
            aggregate {
                count(columns: id)
            }
        }
    }`

export const getContactsOfUserWithId = gql`
    query getContactsOfUserWithId($user_id: uuid!) {
        contacts(where: {user_id: {_eq: $user_id}}) {
            contact
        }
    }`

export const countNumberOfContactsOfUserWithId = gql`
    query countNumberOfContactsOfUserWithId($user_id: uuid!) {
        contacts_aggregate(where: {user_id: {_eq: $user_id}}) {
            aggregate {
                count(columns: contact, distinct: true)
            }
        }
    }
`

export const counterNumberOfChatsBetweenIDAndContact = gql`
    query counterNumberOfChatsBetweenIDAndContact($user_id: uuid!, $contact: uuid!){
        chats_aggregate(where: {
            user_id: {
                _eq: $user_id
            },
            contact: {
                _eq: $contact
            }}) {
            aggregate {
                count(columns: id, distinct: true)
            }
        }
    }`

export const getDialoguesBetweenIDAndContact = gql`
    query getDialoguesBetweenIDAndContact($user_id: uuid!, $contact: uuid!){
        chats(where: {
            user_id: {
                _eq: $user_id
            },
            contact: {
                _eq: $contact
            }}) {
            user_id
            title
            speech_to_text
            created_at
            contact
            chips
            chat_id
            audio
        }
    }`


export const getDialoguesBetweenIDAndContactSubscription = gql`
    subscription getDialoguesBetweenIDAndContact($user_id: uuid!, $contact: uuid!){
        chats(where: {
            user_id: {
                _eq: $user_id
            },
            contact: {
                _eq: $contact
            }}) {
            id
            user_id
            title
            speech_to_text
            created_at
            contact
            chips
            chat_id
            audio
        }
    }`


export const getChipsOfChatId = gql`
    query getChipsOfChatId($chat_id: uuid!){
        chats(where: {chat_id: {_eq: $chat_id}}) {
            chips
        }
    }`


export const getChipsWithId = gql`
    query getChipsWithId($ids: [Int!]!) {
        chips(where: {id: {_in: $ids}}) {
            chip
        }
    }`