import {gql} from "graphql-request";

export const insertUser = (userEmail: string, userID: string, userDisplayName: string) => {
    return gql`
          mutation insertNewUser {
            insert_userdetails_one(object:
              {email: "${userEmail}",
                user_id: "${userID}",
                username: "${userDisplayName}"}) {
              id
            }
          }`
}