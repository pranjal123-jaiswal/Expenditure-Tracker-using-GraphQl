const transactionTypeDef = `
    type Transaction {
        _id: ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String
        date: String!
        user: User!
    }

    type category_staticis {
        category: String!
        totalAmount: Float!
    }

    type Query {
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction
        category_staticis: [category_staticis!]
    }

    type Mutation {
        createTransaction(input: createTransactionInput!): Transaction!
        updateTransaction(input: updateTransactionInput!): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }

    input createTransactionInput {
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        date: String!
        location: String!
    }

    input updateTransactionInput {
        transactionId: ID!
        description: String
        paymentType: String
        category: String
        amount: Float
        location: String
        date: String
    }
`;

export default transactionTypeDef;
