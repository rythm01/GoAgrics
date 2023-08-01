const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const token = require('../utils/token');
const farmer = require('../Schemas/farmerSchema');
const labor = require('../Schemas/laborSchema');
const dealer = require('../Schemas/dealerSchema');

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'dijdjkiqv',
    api_key: '772671317228152',
    api_secret: 'G0Yxb_-1oQNDpFZTyuvH0v35LyA'
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
    console.log(req.files.Avatar);
    if (req.files.Avatar) {
        // If user uploaded a file, save it in Cloudinary
        try {
            const result = await cloudinary.uploader.upload(req.files.Avatar.tempFilePath, {
                folder: "Avatar"
            });
            avatar = {
                public_id: result.public_id,
                url: result.url,
            };
            // await unlinkAsync(req.files.Avatar.tempFilePath);// Delete the temporary file from the server
        } catch (error) {
            return next(new ErrorHandler("Error uploading avatar to Cloudinary", 500));
        }
    } else {
        // If no file uploaded, use the default avatar
        avatar = {
            public_id: "123",
            url: "./images/anonymous.jpg",
        };
    }

    if (category === "Farmer") {
        const user = new farmer({
            Avatar : avatar,
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
            Avatar : avatar,
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
            Avatar : avatar,
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