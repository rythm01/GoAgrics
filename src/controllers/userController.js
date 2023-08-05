const ErrorHandler = require('../utils/errorhandler');
const twilio = require('twilio');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNo = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);
const verificationsid = process.env.verifysid;

const token = require('../utils/token');
const farmer = require('../Schemas/farmerSchema');
const labor = require('../Schemas/laborSchema');
const dealer = require('../Schemas/dealerSchema');

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.apiKey,
    api_secret: process.env.apiSecret
});


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, category, address, pincode, mobno } = req.body;

    if (!name || !category || !address || !pincode || !mobno) {
        return next(new ErrorHandler("Please enter valid details", 400));
    }

    if (pincode.length !== 6) {
        return next(new ErrorHandler("Please enter valid pincode!", 400));
    }

    if (mobno.length !== 10) {
        return next(new ErrorHandler("Please enter valid Mobile Number", 400));
    }

    let avatar;
    console.log(req.file);
    if (!req.file) {
        // If no file uploaded, use the default avatar
        avatar = {
            public_id: "123",
            url: "http://res.cloudinary.com/dijdjkiqv/image/upload/v1691246678/Avatar/hyee9fbp9ziddvasalrp.jpg"
        };
    } else {
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "Avatar"
            });
            avatar = {
                public_id: result.public_id,
                url: result.url,
            };
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler("Error uploading avatar to Cloudinary", 500));
        }
    }

    if (category === "Farmer") {
        const user = new farmer({
            Avatar: avatar,
            fname: name,
            category: category,
            address: address,
            pincode: pincode,
            phoneNo: mobno,
        });

        const result = await user.save();
        const accessToken = token.generateAccessToken(result._id);
        const refreshToken = token.generateRefreshToken(result._id);

        res.status(201).send({
            message: "Farmer registration done successfully",
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
    else if (category === "Labor") {
        const user = new labor({
            Avatar: avatar,
            lname: name,
            category: category,
            address: address,
            pincode: pincode,
            phoneNo: mobno,
        });

        const result = await user.save();
        const accessToken = token.generateAccessToken(result._id);
        const refreshToken = token.generateRefreshToken(result._id);

        res.status(201).send({
            message: "Labour registration done successfully",
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
    else if (category === "Dealer") {
        const user = new dealer({
            Avatar: avatar,
            dname: name,
            category: category,
            address: address,
            pincode: pincode,
            phoneNo: mobno,
        });

        const result = await user.save();
        const accessToken = token.generateAccessToken(result._id);
        const refreshToken = token.generateRefreshToken(result._id);

        res.status(201).send({
            message: "Dealer registration done successfully",
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
    else {
        res.status(400).send({
            message: "Please select valid category"
        })
    }

})

exports.generateOtp = catchAsyncErrors(async (req, res, next) => {
    try {
        const { mobno } = req.body;

        if (!mobno || mobno.length !== 10) {
            return next(new ErrorHandler("Please enter a valid Mobile Number", 400));
        }

        const verification = await client.verify.v2.services(verificationsid)
            .verifications.create({ to: `+91${mobno}`, channel: "sms" });

        if (verification.status === "pending") {
            return res.status(200).send({
                message: "OTP sent successfully"
            });
        } else {
            return next(new ErrorHandler("OTP not sent", 500));
        }
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Error sending OTP", 500));
    }
});

exports.verifyOtp = catchAsyncErrors(async (req, res, next) => {
    try {
        const { phone, otp } = req.body;

        if (!otp || otp.length !== 6) {
            return next(new ErrorHandler("Please enter a valid OTP", 400));
        }

        if (!phone) {
            return next(new ErrorHandler("Please provide phone number", 400));
        }

        const check = await client.verify.v2
            .services(verificationsid)
            .verificationChecks.create({ to: `+91${phone}`, code: otp });

        if (check.status === 'approved') {
            console.log('OTP verified successfully.');
            return res.status(200).send({
                message: "Otp verified successfully"
            });
        } else {
            console.log('Invalid Otp!');
            return next(new ErrorHandler("Invalid Otp!", 401));
        }
    } catch (error) {
        console.error(error.message);
        return next(new ErrorHandler("Otp not verified", 500));
    }
});
