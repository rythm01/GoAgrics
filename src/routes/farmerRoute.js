const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {registerFarmer,getAllFarmerDetails,getFarmerDetail,deleteFarmer,updateFarmer,updateLand,updateTool,deleteLand,deleteTool} = require("../controllers/farmerController")


router.route("/farmer/register/:id").put(verifyToken,registerFarmer);
router.route("/farmers").get(verifyToken,getAllFarmerDetails);
router.route("/farmer/:id").get(verifyToken,getFarmerDetail);
router.route("/farmer/delete/:id").delete(verifyToken,deleteFarmer);
router.route("/farmer/update/:id").put(verifyToken,updateFarmer);
router.route("/farmer/:id/land/:landId").put(verifyToken,updateLand);
router.route("/farmer/:id/tool/:toolId").put(verifyToken,updateTool);
router.route("/farmer/:id/land/:landId").delete(verifyToken,deleteLand);
router.route("/farmer/:id/tool/:toolId").delete(verifyToken,deleteTool);

module.exports = router;