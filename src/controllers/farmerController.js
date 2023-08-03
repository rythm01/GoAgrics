const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const farmer = require('../Schemas/farmerSchema');
const cloudinary = require("cloudinary").v2;

exports.registerFarmer = catchAsyncErrors(async (req, res, next) => {

    try {

        const { l_price, type, area, t_price } = req.body;

        const land = req.files.landPhoto;

        const tool = req.files.toolPhoto;

        t_price = Integer.parseInt(t_price);
        // console.log(land);

        try {

            landImage = await cloudinary.uploader.upload(land.tempFilePath, { folder: "dp" });

            toolImage = await cloudinary.uploader.upload(tool.tempFilePath, { folder: "dp" });


        } catch (error) {
            console.error(error);
            return next(new ErrorHandler("Error uploading file to cloudinary", 400))
        }

        const landData = {
            l_Images: [
                {
                    public_id: landImage.public_id,
                    url: landImage.url
                },
            ],
            l_Type: type,
            l_Price: l_price,
            l_Area: area
        }

        const toolData = {
            t_Images: [
                {
                    public_id: toolImage.public_id,
                    url: toolImage.url
                }
            ],
            t_Price: t_price
            
        }


        try {
            const f = await farmer.findOne({ _id: req.params.id });
            f.landDetails.push(landData);
            f.toolDetails.push(toolData);
            await f.save();
            res.status(200).json({ success: true, message: "Data updated successfully." });
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler("Updation Error", 400));
        }

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Updation Error", 400));
    }

})

exports.getAllFarmerDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const farmers = await farmer.find();

        if (!farmers) {
            return next(new ErrorHandler("Farmers not found", 400));
        }

        return res.status(200).json({
            success: true,
            data: farmers,
        })
    } catch (error) {
        return next(new ErrorHandler("Farmers not found", 400));
    }
})


exports.getFarmerDetail = catchAsyncErrors(async (req, res, next) => {
    try {

        const existFarmer = await farmer.findOne({ _id: req.params.id });
        if (!existFarmer) {
            return next(new ErrorHandler("Farmer not found", 400));
        }
        return res.status(200).send({
            success: true,
            data: existFarmer
        })

    } catch (error) {
        return next(new ErrorHandler("Farmer not found", 400));
    }
})

exports.deleteFarmer = catchAsyncErrors(async (req, res, next) => {
    try {
        const deleteFarmer = await farmer.findByIdAndDelete(req.params.id);
        // console.log(deleteFarmer);
        if (!deleteFarmer) {
            return next(new ErrorHandler("Deletion Error", 400));
        }
        return res.status(200).send({
            success: true,
            data: "Deleted Successfully"
        })

    } catch (error) {
        return next(new ErrorHandler("Deletion Error", 400));
    }
})

exports.updateFarmer = catchAsyncErrors(async (req, res, next) => {
    try {
        const { fname, address, pincode } = req.body

        const updatedDetails = { fname, address, pincode };

        const updateFarmer = await farmer.findByIdAndUpdate(req.params.id, {
            $set: updatedDetails
        })

        if (!updateFarmer) {
            return next(new ErrorHandler("Profile Updation Error", 400));
        }

        return res.status(200).send({
            success: true,
            data: "Profile update successfully"
        })

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Profile Updation Error", 400));
    }
})

exports.updateLand = catchAsyncErrors(async (req, res, next) => {
    try {
        const { l_price, type, area } = req.body;
        const land = req.files.landPhoto;

        // Upload the new land image to Cloudinary
        let updatedLandImage;
        try {
            updatedLandImage = await cloudinary.uploader.upload(land.tempFilePath, { folder: 'dp' });
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler('Error in uploading to Cloudinary', 400));
        }

        const farmerDetails = await farmer.findById(req.params.id);

        if (!farmerDetails) {
            return next(new ErrorHandler('Farmer not found', 404));
        }

        // Find the specific land detail in the farmer's landDetails array
        const landDetailsToUpdate = farmerDetails.landDetails.find(
            (landDetail) => landDetail._id.toString() === req.params.landId
        );

        for (let i = 0; i < landDetailsToUpdate.l_Images.length; i++) {
            await cloudinary.uploader.destroy(landDetailsToUpdate.l_Images[i].public_id);
        }

        if (!landDetailsToUpdate) {
            return next(new ErrorHandler('Land detail not found', 404));
        }

        // Update the land details
        landDetailsToUpdate.l_Images[0].public_id = updatedLandImage.public_id;
        landDetailsToUpdate.l_Images[0].url = updatedLandImage.url;
        landDetailsToUpdate.l_Type = type;
        landDetailsToUpdate.l_Price = l_price;
        landDetailsToUpdate.l_Area = area;

        // Save the updated farmer document to the database
        await farmerDetails.save();

        res.status(200).json({ success: true, message: 'Land details and image updated successfully' });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler('Land Updation Error', 400));
    }
});

exports.updateTool = catchAsyncErrors(async (req, res, next) => {
    try {
        const { t_price } = req.body;
        const tool = req.files.toolPhoto
        let updatedToolImage;
        try {
            updatedToolImage = await cloudinary.uploader.upload(tool.tempFilePath, { folder: "dp" });
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler("Error in uploading to Cloudinary", 400));
        }

        const farmerDetails = await farmer.findById(req.params.id);

        if (!farmerDetails) {
            return next(new ErrorHandler('Farmer not found', 404));
        }

        // Find the specific tool detail in the farmer's landDetails array
        const toolDetailsToUpdate = farmerDetails.toolDetails.find(
            (toolDetail) => toolDetail._id.toString() === req.params.toolId
        );

        for (let i = 0; i < toolDetailsToUpdate.t_Images.length; i++) {
            await cloudinary.uploader.destroy(toolDetailsToUpdate.t_Images[i].public_id);
        }

        if (!toolDetailsToUpdate) {
            return next(new ErrorHandler('Land detail not found', 404));
        }

        toolDetailsToUpdate.t_Images[0].public_id = updatedToolImage.public_id;
        toolDetailsToUpdate.t_Images[0].url = updatedToolImage.url;
        toolDetailsToUpdate.t_Price = t_price;

        await farmerDetails.save();

        res.status(200).json({ success: true, message: 'Tool details and image updated successfully' });


    } catch (error) {
        console.log(error);
        return next(new ErrorHandler('Tool Updation Error', 400));
    }

})

exports.deleteLand = catchAsyncErrors(async (req, res, next) => {
    try {
        const farmerDetails = await farmer.findById(req.params.id);
        if (!farmerDetails) {
            return next(new ErrorHandler('Farmer not found', 400));
        }

        const landToBeDeleted = farmerDetails.landDetails.find((landDetail) => landDetail._id.toString() === req.params.landId)

        farmerDetails.landDetails.splice(landToBeDeleted, 1);

        await farmerDetails.save();

        return res.status(200).send({
            success: true,
            data: "Land Successfully Deleted"
        })

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler('Land Deletion Error', 400));
    }
})


exports.deleteTool = catchAsyncErrors(async (req, res, next) => {
    try {
        const farmerDetails = await farmer.findById(req.params.id);
        if (!farmerDetails) {
            return next(new ErrorHandler('Farmer not found', 400));
        }

        const toolToBeDeleted = farmerDetails.toolDetails.find((toolDetail) => toolDetail._id.toString() === req.params.toolId)

        farmerDetails.toolDetails.splice(toolToBeDeleted, 1);

        await farmerDetails.save();

        return res.status(200).send({
            success: true,
            data: "Tool Successfully Deleted"
        })

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler('Tool Deletion Error', 400));
    }
})