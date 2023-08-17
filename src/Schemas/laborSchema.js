const mongoose = require('mongoose');

const laborSchema = new mongoose.Schema({
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
    lname: String,
    category: {
        type: String,
        required: true
    },
    address: String,
    pincode: {
        type: Number,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    skills: [String],
    pricePerDay: {
        type: Number,
    },
    city:{
        type:String
    }
});
const labor = mongoose.model("labor", laborSchema);
module.exports = labor;