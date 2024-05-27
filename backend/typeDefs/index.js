import {mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./user.typeDef.js";
import transactionTypeDef from "./transation.typeDef.js";


const mergeTypes = mergeTypeDefs([userTypeDef , transactionTypeDef])

export default mergeTypes;  