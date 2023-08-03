const mongoose = require('mongoose');

const toolDetailsSchema = new mongoose.Schema({
    t_Images: [{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    }],
    t_Price: {
        type: Number,
        required: true,
    }
})

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
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    address: String,
    phoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    bidDetails: [
        {
            farmer_Id: {
                type: String
            },
            bPrice: {
                type: Number
            }
        }
    ],
    toolDetails: [toolDetailsSchema]
});
const dealer = mongoose.model("dealer", dealerSchema);
module.exports = dealer;