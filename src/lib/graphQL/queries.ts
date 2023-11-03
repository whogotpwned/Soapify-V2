
import {gql} from "graphql-request";

export const getUser  = gql`
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
        }
    }`

export const countNumberOfUsersWithId = gql`
    query countNumberOfUsersWithIds($user_id: uuid!) {
        userdetails_aggregate(distinct_on: id, where: {user_id: {_eq: $user_id}}) {
            aggregate {
                count(columns: id, distinct: true)
            }
        }
    }`