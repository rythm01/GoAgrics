const express = require('express');
const router = express.Router();
// const verifyToken = require('../middleware/verifyToken');
const {registerFarmer,getAllFarmerDetails,getFarmerDetail,deleteFarmer,updateFarmer,updateLand,updateTool,deleteLand,deleteTool} = require("../controllers/farmerController")


router.route("/farmer/register/:id").put(registerFarmer);
router.route("/farmers").get(getAllFarmerDetails);
router.route("/farmer/:id").get(getFarmerDetail);
router.route("/farmer/delete/:id").delete(deleteFarmer);
router.route("/farmer/update/:id").put(updateFarmer);
router.route("/farmer/:id/land/:landId").put(updateLand);
router.route("/farmer/:id/tool/:toolId").put(updateTool);
router.route("/farmer/:id/land/:landId").delete(deleteLand);
router.route("/farmer/:id/tool/:toolId").delete(deleteTool);

module.exports = router;