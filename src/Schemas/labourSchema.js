const mongoose = require('mongoose');

const labourSchema = new mongoose.Schema({
    lname: String,
    category : {
        type : String,
        required : true
    },
    address : String,
    pincode:{
        type: Number,
        required : true,
    },
    phoneNo: {
        type : Number,
        required : true,
        unique : true
    },
    skills : [
        {
          skillN : String,
        }
    ],
    pricePerDay : {
        type : Number,
    },
    isAvailable : Boolean,
});
const labour = mongoose.model("labour",labourSchema);
module.exports = labour;