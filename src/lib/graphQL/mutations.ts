import {gql} from "graphql-request";

export const insertUser = gql`
    mutation insertNewUser($email: String!, $user_id: uuid!, $username: String!) {
        insert_userdetails_one(
            object:
        {
            email: $email,
            user_id: $user_id,
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