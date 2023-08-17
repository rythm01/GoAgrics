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

const landDetailsSchema = new mongoose.Schema({
    l_Images: [
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
    ],
    l_Type: {
        type: String,
        required: true,
    },
    l_Price: {
        type: Number,
        required: true,
    },
    l_Area: {
        type: String,
        required: true,
    },
    bidDetails: [
        {
            dealerId: {
                type: String
            },
            bPrice: {
                type: Number
            }
        }
    ]
});

const farmerSchema = new mongoose.Schema({
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
    fname: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name shold have more than 4 characters"],
    },
    category: {
        type: String,
        required: [true, "Please enter your category"],
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    phoneNo: {
        type: Number,
        unique: true,
        required: [true, "Please Enter Your Phone No"],
    },
    city:{
        type:String
    },
    landDetails: [landDetailsSchema],
    toolDetails: [toolDetailsSchema]
});

const farmer = mongoose.model("farmer", farmerSchema);
module.exports = farmer;