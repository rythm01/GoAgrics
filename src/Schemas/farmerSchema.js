const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    address : String,
    pincode:{
        type: Number,
        required : true,
    },
    phoneNo : {
        type : String,
        required : true
    },
    // landDetail : {
    //     l_Image: Buffer,
    //     l_Area : Number,
    // }
    
});

const farmer = mongoose.model("farmer",farmerSchema);
module.exports = farmer;