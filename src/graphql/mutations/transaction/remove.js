import {GraphQLNonNull, GraphQLID} from 'graphql';

import transaction from '../../../Models/transaction.js';
import {transactionType} from '../../types/transaction.js';
import redisClient from "../../../Models/redis.js";

export default {
    type: transactionType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params) {
        const removedTransaction = transaction.findByIdAndRemove(params.id).exec();
        if (!removedTransaction) {
            throw new Error('Error removing transaction');
        }
        redisClient.del(`transactions:${params.id}`);
        return removedTransaction;
    }
}