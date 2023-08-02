const express = require('express');
const router = express.Router();
// const verifyToken = require('../middleware/verifyToken');
const {registerDealer,getDealerDetail,updateDealer,deleteDealer,updateTool,deleteTool,getAllDealerDetails,registerBid,deleteBid} = require("../controllers/dealerController");

router.route("/dealer/register/:id").put(registerDealer);
router.route("/dealers").get(getAllDealerDetails);
router.route("/dealer/:id").get(getDealerDetail);
router.route("/dealer/delete/:id").delete(deleteDealer);
router.route("/dealer/update/:id").put(updateDealer);
router.route("/dealer/:id/tool/:toolId").put(updateTool);
router.route("/dealer/:id/tool/:toolId").delete(deleteTool);
router.route("/dealer/:dealerId/farmer/:farmerId/land/:landId").put(registerBid).delete(deleteBid);

module.exports = router