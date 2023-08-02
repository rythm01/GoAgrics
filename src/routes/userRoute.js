const express = require('express');
const {verifyOtp, registerUser, generateOtp }  = require('../controllers/userController');
const router = express.Router();

router.route("/generate").post(generateOtp);
router.route("/verify").post(verifyOtp);
router.route("/register").post(registerUser);

module.exports = router;