import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    qrCode : {type : String, require : true},
    rfid : {type : String, require : true},
    itemPrice : {type : Number, require :true},
    totalItem : {type : Number, require : true},
    orderDate : Date
});

transactionSchema.pre('save', function(next){
    let currentDate = new Date();
    this.orderDate = currentDate;
    next();
});

export default model('transaction', transactionSchema);