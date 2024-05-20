import {GraphQLNonNull} from "graphql";
import axios from "axios";

import {transactionType, transactionInputType} from "../../types/transaction.js";
import transaction from "../../../Models/transaction.js";
import redisClient from "../../../Models/redis.js";

const storeTransaction = async (transaction) => {
    try {
        const response = await axios.post('http://localhost:8080/api/transactions', transaction);
        if (response.status === 200) {
            console.log('Transaction stored');
        }
    } catch (error) {
        console.error(error);
    }
}

export default {
    type: transactionType,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(transactionInputType)
        }
    },
    async resolve(root, params) {
        const transactionModel = new transaction(params.data);
        const newTransaction = await transactionModel.save();
        if (!newTransaction) {
            throw new Error('Error adding transaction');
        }
        storeTransaction(newTransaction);
        redisClient.del('transactions')
        return newTransaction;
    }
}