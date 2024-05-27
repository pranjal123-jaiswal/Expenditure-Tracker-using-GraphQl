import {gql} from "@apollo/client"

export const GET_TRANSCATION = gql `
    query GetTranscaion {
        transactions {
        _id
        userId
        description
        paymentType
        category
        amount
        location
        date
        }
    }
`

export const GET_TRANSCATION_BY_ID = gql `
query GetTranscaionById($id: ID!) {
    transaction(transactionId : $id){
        _id
        userId
        description
        paymentType
        category
        amount
        location
        date
    }
}
`