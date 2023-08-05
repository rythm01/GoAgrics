const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const verifyToken = require('../middleware/verifyToken');
const {registerFarmer,getAllFarmerDetails,getFarmerDetail,deleteFarmer,updateFarmer,updateLand,updateTool,deleteLand,deleteTool} = require("../controllers/farmerController")


router.route("/farmer/register/:id").put(verifyToken,upload.fields([
    { name: 'landPhoto', maxCount: 5 },
    { name: 'toolPhoto', maxCount: 5 },
]),registerFarmer);
router.route("/farmers").get(verifyToken,getAllFarmerDetails);
router.route("/farmer/:id").get(verifyToken,getFarmerDetail);
router.route("/farmer/delete/:id").delete(verifyToken,deleteFarmer);
router.route("/farmer/update/:id").put(verifyToken,updateFarmer);
router.route("/farmer/:id/land/:landId").put(verifyToken,upload.fields([
    { name: 'landPhoto', maxCount: 5 },
]),updateLand);
router.route("/farmer/:id/tool/:toolId").put(verifyToken,upload.fields([
    { name: 'toolPhoto', maxCount: 5 },
]),updateTool);
router.route("/farmer/:id/land/:landId").delete(verifyToken,deleteLand);
router.route("/farmer/:id/tool/:toolId").delete(verifyToken,deleteTool);

module.exports = router;