const mongoose=require('mongoose');

const borrowerSchema=mongoose.Schema({
    // borId: {type: String, default: false},
    name : {type: String, required: true},
    price: {type: String,required: true},
    rate : {type: String,required: true},
    priceRate: {type: String, required: true},
    irtp: {type: String, required: true},
    OneMonthInDay: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports=mongoose.model('Borrowers',borrowerSchema);