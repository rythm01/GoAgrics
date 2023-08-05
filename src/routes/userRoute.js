const express = require('express');
const {verifyOtp, registerUser, generateOtp }  = require('../controllers/userController');
const router = express.Router();
const upload = require('../utils/multer');

router.route("/generate").post(generateOtp);
router.route("/verify").post(verifyOtp);
router.route('/register').post(upload.single('Avatar'), registerUser);

module.exports = router;