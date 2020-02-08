const express = require('express')
const router = express.Router()


const {signup,accountActivation,signin , forgotPassword,resetPassword,googleLogin,facebookLogin} = require('../controllers/auth')
const {userSignupValidator , userSigninValidator, forgotPasswordValidator,resetPasswordValidator} = require("../validators/auth")
const  {runValidator} = require("../validators/index")

router.post("/signup",userSignupValidator,runValidator,signup)
router.post("/account-activation",accountActivation)
router.post("/signin", userSigninValidator,runValidator,signin)
//forgot reset password
router.put('/forgot-password', forgotPasswordValidator , runValidator,forgotPassword)
router.put('/reset-password', resetPasswordValidator , runValidator,resetPassword)
//face google
router.post('/google-login',googleLogin)
router.post('/facebook-login',facebookLogin)


module.exports = router