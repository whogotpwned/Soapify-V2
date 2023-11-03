import {gql} from "graphql-request";

export const insertUser = gql`
    mutation insertNewUser($email: String!, $user_id: uuid!, $username: String!) {
        insert_userdetails_one(
            object:
        {email: $email,
            user_id: $user_id,
            username: $username}
            on_conflict: { constraint: userdetails_pkey, update_columns: [last_login] }
        ) {
            id
        }
    }`