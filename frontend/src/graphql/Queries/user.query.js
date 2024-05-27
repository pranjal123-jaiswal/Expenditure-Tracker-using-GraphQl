import { gql } from "@apollo/client";

export const GET_AUTHENTICATE_USER = gql`
    query GetAuthenticateUser {
        authUser {
            _id
            username
            name
            profilePicture
        }
    }
`;
