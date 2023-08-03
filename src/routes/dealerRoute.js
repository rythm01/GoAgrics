const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {registerDealer,getDealerDetail,updateDealer,deleteDealer,updateTool,deleteTool,getAllDealerDetails,registerBid,deleteBid} = require("../controllers/dealerController");

router.route("/dealer/register/:id").put(verifyToken,registerDealer);
router.route("/dealers").get(verifyToken,getAllDealerDetails);
router.route("/dealer/:id").get(verifyToken,getDealerDetail);
router.route("/dealer/delete/:id").delete(verifyToken,deleteDealer);
router.route("/dealer/update/:id").put(verifyToken,updateDealer);
router.route("/dealer/:id/tool/:toolId").put(verifyToken,updateTool);
router.route("/dealer/:id/tool/:toolId").delete(verifyToken,deleteTool);
router.route("/dealer/:dealerId/farmer/:farmerId/land/:landId").put(verifyToken,registerBid).delete(verifyToken,deleteBid);

module.exports = router
module.exports = router