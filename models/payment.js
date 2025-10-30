const mongoose=require('mongoose');

const paymentSchema=mongoose.Schema({
    name : {type: String, required: true},
    price: {type: String,required: true},
    rate : {type: String,required: true},
    priceRate: {type: String, required: true},
    irtp: {type: String, required: true},
    dayPrice: {type: String, required: true},
    day: {type : Number, default: 0},
    date: {type: Date, default: Date.now}
});

module.exports=mongoose.model('payment',paymentSchema);