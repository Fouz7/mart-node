import {GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLID, GraphQLInt} from 'graphql';

import GraphQLDate from 'graphql-date';

const transactionType = new GraphQLObjectType({
    name: 'Transaction',
    description: 'Transaction Type',
    fields: () => ({
        _id: {type: GraphQLID},
        qrCode: {type: GraphQLString},
        rfid: {type: GraphQLString},
        itemPrice: {type: GraphQLInt},
        totalItem: {type: GraphQLInt},
        orderDate: {type: GraphQLDate}
    })
});

const transactionInputType = new GraphQLInputObjectType({
    name: 'TransactionInput',
    description: 'Transaction Input Type',
    fields: () => ({
        qrCode: {type: GraphQLString},
        rfid: {type: GraphQLString},
        itemPrice: {type: GraphQLInt},
        totalItem: {type: GraphQLInt}
    })
});

export {transactionType, transactionInputType};