const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
    Avatar:
    {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
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
        type : Number,
        required : true,
        unique : true
    },
    bid: {
        type : Number,
        // required : true,
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