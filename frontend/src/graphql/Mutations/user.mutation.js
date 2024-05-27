import { gql } from "@apollo/client";

export const SIGNUP = gql `
    mutation SignUP($input: SignUpInput!) {
        signUp(input: $input){
            _id
            name
            username
        }
    }
    `;

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input){
            _id
            name
            username
        }

        }
`;
export const LOGOUT = gql `
        mutation Logout {
            logout{
                message
            }
        }
`