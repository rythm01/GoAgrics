const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const token = require('../utils/token');
const verifyToken = require('../middleware/verifyToken');
const dealer = require('../Schemas/dealerSchema');
const farmer = require('../Schemas/farmerSchema');
const cloudinary = require("cloudinary").v2;

exports.registerDealer = catchAsyncErrors(async (req, res, next) => {
    try {
        const { t_price } = req.body;
        const tool = req.files.toolPhoto;
        try {
            toolImage = await cloudinary.uploader.upload(tool.tempFilePath, { folder: "dp" });
            // console.log(toolImage);
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler("Unable to change dealer", 400));
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

        const d = await dealer.findOne({ _id: req.params.id });
        console.log(d);
        d.toolDetails.push(toolData);
        await d.save();
        res.status(200).json({ success: true, message: "Data updated successfully." });

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Unable to change dealer", 400));
    }
})

exports.getDealerDetail = catchAsyncErrors(async (req, res, next) => {
    try {

        const existDealer = await dealer.findOne({ _id: req.params.id });
        if (!existDealer) {
            return next(new ErrorHandler("Dealer not found", 400));
        }
        return res.status(200).send({
            success: true,
            data: existDealer
        })

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Dealer not found", 400));
    }
})

exports.updateDealer = catchAsyncErrors(async (req, res, next) => {
    try {
        const { dname, address, pincode } = req.body

        const updatedDetails = { dname, address, pincode };

        const updateDealer = await dealer.findByIdAndUpdate(req.params.id, {
            $set: updatedDetails
        })

        if (!updateDealer) {
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

exports.deleteDealer = catchAsyncErrors(async (req, res, next) => {
    try {
        const deleteDealer = await dealer.findByIdAndDelete(req.params.id);
        // console.log(deleteFarmer);
        if (!deleteDealer) {
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

        const dealerDetails = await dealer.findById(req.params.id);

        if (!dealerDetails) {
            return next(new ErrorHandler('Dealer not found', 404));
        }

        // Find the specific tool detail in the farmer's landDetails array
        const toolDetailsToUpdate = dealerDetails.toolDetails.find(
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

        await dealerDetails.save();

        res.status(200).json({ success: true, message: 'Tool details and image updated successfully' });


    } catch (error) {
        console.log(error);
        return next(new ErrorHandler('Tool Updation Error', 400));
    }

})

exports.deleteTool = catchAsyncErrors(async (req, res, next) => {
    try {
        const dealerDetails = await dealer.findById(req.params.id);
        if (!dealerDetails) {
            return next(new ErrorHandler('Dealer not found', 400));
        }

        const toolToBeDeleted = dealerDetails.toolDetails.find((toolDetail) => toolDetail._id.toString() === req.params.toolId)

        dealerDetails.toolDetails.splice(toolToBeDeleted, 1);

        await dealerDetails.save();

        return res.status(200).send({
            success: true,
            data: "Tool Successfully Deleted"
        })

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler('Tool Deletion Error', 400));
    }
})

exports.getAllDealerDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const dealers = await dealer.find();

        if (!dealers) {
            return next(new ErrorHandler("Dealers not found", 400));
        }

        return res.status(200).json({
            success: true,
            data: dealers,
        })
    } catch (error) {
        return next(new ErrorHandler("Dealers not found", 400));
    }
})

exports.registerBid = catchAsyncErrors(async (req, res, next) => {

    try {
        const { bid_price } = req.body;

        const farmerDetails = await farmer.findById(req.params.farmerId);

        if (!farmerDetails) {
            return next(new ErrorHandler("Farmer with land to register a bid not found", 400));
        }

        const landDetails = farmerDetails.landDetails.find((landDetail) => landDetail._id.toString() === req.params.landId);
        // console.log(landDetails);

        const bidDetailsForFarmer = {
            dealerId: req.params.dealerId,
            bPrice: bid_price
        }

        const bidDetailsForDealer = {
            farmer_Id: req.params.farmerId,
            bPrice: bid_price
        }

        landDetails.bidDetails.push(bidDetailsForFarmer);

        const dealerDetails = await dealer.findById(req.params.dealerId);

        dealerDetails.bidDetails.push(bidDetailsForDealer);

        await dealerDetails.save();

        await farmerDetails.save()

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Unable to register a bid", 400));
    }
})

exports.deleteBid = catchAsyncErrors(async (req, res, next) => {
    try {
      const farmerDetails = await farmer.findById(req.params.farmerId);
  
      if (!farmerDetails) {
        return next(new ErrorHandler("Farmer with land to delete a bid not found", 400));
      }
  
      const landDetails = farmerDetails.landDetails.find((landDetail) => landDetail._id.toString() === req.params.landId);
  
      if (!landDetails) {
        return next(new ErrorHandler("Land with bid to delete not found", 400));
      }
  
      // Find the index of the bid details to remove
      const farmerBidIndex = landDetails.bidDetails.findIndex(bid => bid.dealerId.toString() === req.params.dealerId);
      if (farmerBidIndex !== -1) {
        landDetails.bidDetails.splice(farmerBidIndex, 1);
      }
  
      await farmerDetails.save();
  
      const dealerDetails = await dealer.findById(req.params.dealerId);
      
      if (!dealerDetails) {
        return next(new ErrorHandler("Dealer with bid to delete not found", 400));
      }
  
      // Find the index of the bid details to remove
      const dealerBidIndex = dealerDetails.bidDetails.findIndex(bid => bid.farmer_Id.toString() === req.params.farmerId);
      if (dealerBidIndex !== -1) {
        dealerDetails.bidDetails.splice(dealerBidIndex, 1);
      }
  
      await dealerDetails.save();
  
      res.status(200).json({
        success: true,
        message: "Bid deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Unable to delete bid", 400));
    }
  });