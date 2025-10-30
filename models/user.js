const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true, unique: false},
    password: {type: String, required: true},
    otp: {type: String},
    otpExpiry: {type: Date},
    isVerified: {type: Boolean, default: false}
});

module.exports=mongoose.model('users',userSchema);