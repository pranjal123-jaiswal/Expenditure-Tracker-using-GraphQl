import Transaction from "../models/transcationmodels.js";
import User from "../models/usermodels.js"

const transactionResolver = {
    Query: {
        transactions: async (_, __, context) => {
            try {
                const user = context.getUser();
                if (!user) throw new Error("Unauthorized");
                const userId = user._id;
 
                const transactions = await Transaction.find({ userId });
                return transactions;
            } catch (err) {
                console.error("Error getting transactions:", err);
                throw new Error("Error getting transactions");
            }
        },
        transaction: async (_, { transactionId }) => {
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            } catch (err) {
                console.error("Error getting transaction:", err);
                throw new Error("Error getting transaction");
            }
        },

        category_staticis: async( _, __, context) => {
            try {
                if(!context.getUser()) throw new Error("Unauthorized")
                const userId = context.getUser()._id
                console.log("User object:", userId);
                const transactions = await Transaction.find({userId})
                // console.log("transactions" , transactio`ns)
                const categoryMap = {}

                transactions.forEach((transaction) => {
                    if (!categoryMap[transaction.category]) {
                        categoryMap[transaction.category] = 0;
                    }
                    categoryMap[transaction.category] += transaction.amount;
                });
    
                // categoryMap = { expense: 125, investment: 100, saving: 50 }
    
                return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }));
            }catch(err){
                console.error("Error getting category statics:", err);
            }

        }
    },
    Mutation: {
        createTransaction: async (_, { input }, context) => {
            try {
                const user = context.getUser();
                if (!user) throw new Error("Unauthorized");
                const userId = user._id;

                const newTransaction = new Transaction({
                    ...input,
                    userId,
                });
                await newTransaction.save();
                return newTransaction;
            } catch (err) {
                console.error("Error creating transaction:", err);
                throw new Error("Error creating transaction");
            }
        },
        updateTransaction: async (_, { input }) => {
            try {
                const updatedTransaction = await Transaction.findByIdAndUpdate(
                    input.transactionId,
                    input,
                    { new: true }
                );
                return updatedTransaction;
            } catch (err) {
                console.error("Error updating transaction:", err);
                throw new Error("Error updating transaction");
            }
        },
        deleteTransaction: async (_, { transactionId }) => {
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;
            } catch (err) {
                console.error("Error deleting transaction:", err);
                throw new Error("Error deleting transaction");
            }
        }
    },
    Transaction: {
        user: async(parent) => {
            const userId = parent.userId    
            try{
                const user = await User.findById(userId)
                return user
            } catch(err){
                throw new Error("Error")

            }
        }
    }
};

export default transactionResolver;
