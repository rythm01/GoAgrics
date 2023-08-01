const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const labor = require('../Schemas/laborSchema');

//single labor details
exports.getLaborDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        // Check if the user with the given ID exists in the database
        const existingLabor = await labor.findOne({ _id: req.params.id });

        if (!existingLabor) {
            return next(new ErrorHandler("User with the given ID not found", 404));
        }

        // If the user exists, return their details
        res.status(200).json({
            success: true,
            data: existingLabor,
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Failed to fetch labor details", 500));
    }
});

//show all labors in db
exports.getAllLaborDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const allLabor = await labor.find();

        res.status(200).json({
            success: true,
            data: allLabor,
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Failed to fetch labor details", 500));
    }
});

exports.registerLabor = catchAsyncErrors(async (req, res, next) => {
    const { skill, price } = req.body;

    try {
        if (!skill || !price) {
            return next(new ErrorHandler("Please enter both skill and price", 400));
        }

        // Check if the user with the given ID exists in the database
        const existingLabor = await labor.findOne({ _id: req.params.id });
        console.log(existingLabor);

        if (!existingLabor) {
            return next(new ErrorHandler("User with the given ID not found", 404));
        }

        // User found, update their details
        const result = await labor.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    pricePerDay: price,
                },
                $push: {
                    "skills": skill,
                }
            }
        );

        console.log(result);
        res.status(200).json({
            success: true,
            message: "Labor registered successfully",
            data: result,
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Invalid details!", 400));
    }
});

exports.updateLabor = catchAsyncErrors(async (req, res, next) => {
    const { lname, address, pincode, skills, pricePerDay } = req.body;
    const allowedUpdates = { lname, address, pincode, skills, pricePerDay };

    try {
        // Find the labor by ID and update the allowed fields
        const updatedLabor = await labor.findByIdAndUpdate(
            req.params.id,
            { $set: allowedUpdates },
            { new: true }
        );

        if (!updatedLabor) {
            return next(new ErrorHandler("Labor not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Labor details updated successfully",
            data: updatedLabor,
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Invalid details!", 404));
    }
});

exports.deleteLabor = catchAsyncErrors(async (req, res, next) => {
    try {
        const deletedLabor = await labor.findByIdAndDelete(req.params.id);
        if (!deletedLabor) {
            return next(new ErrorHandler("Labor not found", 404));
        }
        res.status(200).json({
            success: true,
            message: "Labor deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Invalid details!", 404));
    }
});