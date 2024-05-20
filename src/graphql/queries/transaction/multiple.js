import { GraphQLList } from 'graphql';
import {transactionType} from "../../types/transaction.js";
import Transaction from "../../../Models/transaction.js";
import redisClient from "../../../Models/redis.js";

const DEFAULT_EXPIRATION = 3600;

export default {
    type: new   GraphQLList(transactionType),
    async resolve(root, params) {
        const cachedTransactions = await redisClient.get('transactions');
        if (cachedTransactions) {
            const transactions = JSON.parse(cachedTransactions);
            transactions.map((data) => {
                data.orderDate = new Date(data.orderDate);
            });
            return transactions;
        } else {
            const transactions = await Transaction.find().lean();
            if (!transactions) {
                throw new Error('Error getting transactions');
            }
            redisClient.setEx('transactions', DEFAULT_EXPIRATION, JSON.stringify(transactions));
            return transactions;
        }
    }
}
