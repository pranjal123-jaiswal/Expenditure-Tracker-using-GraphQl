import {gql} from "@apollo/client"

export const CREATE_TRANSCATION = gql `
    mutation CreateTranscation($input: createTransactionInput!){
        createTransaction(input : $input){
        _id
        description
        paymentType
        category
        amount
        location
        date
        }
    }
`
export const UPDATE_TRANSCATION = gql `
    mutation Update_Transcation($input: updateTransactionInput! ){
        updateTransaction(input: $input){
            _id
        description
        paymentType
        category
        amount
        location
        date
        }
    }
`

export const DELETE_TRANSCATION = gql `
    mutation DeleteTranscation($input: ID!){
        deleteTransaction(transactionId: $input){
            _id
        description
        paymentType
        category
        amount
        location
        date
        }
    }
`