const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const token = require('../utils/token');
const verifyToken = require('../middleware/verifyToken');
const farmer = require('../Schemas/farmerSchema');
const labour = require('../Schemas/labourSchema');
const dealer = require('../Schemas/dealerSchema');

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
    else {
        if (category === "Farmer") {
            const user = new farmer({
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
        else if (category === "Labour") {
            const user = new labour({
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
    }
})