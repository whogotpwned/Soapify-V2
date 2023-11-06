import {gql} from "graphql-request";

export const insertUser = gql`
    mutation insertNewUser($email: String!, $user_id: uuid!, $username: String!, $avatar_url: String!) {
        insert_userdetails_one(
            object:
        {
            email: $email,
            user_id: $user_id,
            avatar_url: $avatar_url,
            username: $username}
            on_conflict: { 
                constraint: userdetails_pkey, 
                update_columns: [last_login] 
            }) 
        {
            id
        }
    }`

export const insertOneContact = gql`
    mutation insertContact($contact: uuid!, $user_id: uuid!, $friendship_hash: String!) {
        insert_contacts_one(object: {
            contact: $contact,
            user_id: $user_id,
            friendship_hash: $friendship_hash}) {
            id
        }
    }`


export const updateUsername = gql`
    mutation updateUsername($user_id: uuid!, $username: String!) {
        update_userdetails(where: {
            user_id: {
                _eq: $user_id
            }
        },_set: {
            username: $username
        }) {
            returning {
                id
            }
        }
    }
`

export const deleteContactOfUserWithId = gql`
    mutation deleteContactOfUserWithId($user_id: uuid!, $contact: uuid!) {
        delete_contacts(where: {
            user_id: {
                _eq: $user_id}, 
            contact: {
                _eq: $contact}}) {
            returning {
                id
            }
        }
    }`


export const insertNewDialogue = gql`
    mutation insertNewDialogue($audio: String!, $contact: uuid!, $title: String!, $speech_to_text: String!, $chips: jsonb!, $user_id: uuid!) {
        insert_chats_one(object: {
            audio: $audio,
            contact: $contact,
            title: $title,
            speech_to_text: $speech_to_text,
            chips: $chips,
            user_id: $user_id}) {
            chat_id
        }
    }`


export const insertChipInChipsTable = gql`
    mutation insertChipInChipsTable($chips: [chips_insert_input!]!) {
        insert_chips(objects: $chips, on_conflict: {constraint: chips_pkey, update_columns: last_used}) {
            returning {
                id
                chip
            }
        }
    }`

export const updateChipsInChatsTable = gql`
    mutation updateChipsInChatsTable($chat_id: uuid!, $chips: jsonb!) {
        update_chats(where: {chat_id: {_eq: $chat_id}}, _set: {chips: $chips}) {
            returning {
                id
            }
        }
    }`

export const updateTitleInChatsTable = gql `
mutation updateTitleInChatsTable($chat_id: uuid!, $user_id: uuid!, $title: String!) {
    update_chats(where: {chat_id: {_eq: $chat_id}, _and: {}, user_id: {_eq: $user_id}}, _set: {title: $title}) {
        returning {
            title
        }
    }
}`
