const express = require('express');
const { getLaborDetails,getAllLaborDetails,registerLabor,updateLabor, deleteLabor }  = require('../controllers/laborController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.route("/labor/:id").get(verifyToken,getLaborDetails);
router.route("/labor").get(verifyToken,getAllLaborDetails);
router.route("/labor/register/:id").put(verifyToken,registerLabor);
router.route("/labor/update/:id").put(verifyToken,updateLabor);
router.route("/labor/delete/:id").delete(verifyToken,deleteLabor);

module.exports = router;