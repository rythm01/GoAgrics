const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
    dname: {
        type : String,
        required: true
    },
    category : {
        type : String,
        required : true
    },
    pincode:{
        type: Number,
        required : true
    },
    address : String,
    phoneNo: {
        type : String,
        required : true,
        unique : true
    },
    bid: {
        type : Number,
        required : true,
    },
    tools : [
        {
            img:String,
            tname:String
        }
    ],  
});
const dealer = mongoose.model("dealer",dealerSchema);
module.exports = dealer;