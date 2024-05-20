import {GraphQLID, GraphQLNonNull} from 'graphql';

import {transactionType} from '../../types/transaction.js';
import redisClient from "../../../Models/redis.js";

const DEFAULT_EXPIRATION = 3600;

export default {
    type: transactionType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve(root, params) {
        const cachedTransaction = await redisClient.get(`transactions:${params.id}`);
        if (cachedTransaction) {
            const transactionObj = JSON.parse(cachedTransaction);
            transactionObj.orderDate = new Date(transactionObj.orderDate);
            return transactionObj;
        } else {
            const transaction = await transaction.findById(params.id).lean();
            if (!transaction) {
                throw new Error(`Error getting transaction with id ${params.id}`);
            }
            redisClient.setEx(`transactions:${params.id}`, DEFAULT_EXPIRATION, JSON.stringify(transaction));
            return transaction;
        }

    }
}