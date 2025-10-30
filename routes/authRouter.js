const router=require('express').Router();
const controller=require('../controller/authController');

router.post('/auth/register', controller.register);
router.post('/auth/vertifyOTP',controller.vertifyOTP);
router.post('/auth/login',controller.login);
router.post('/auth/forgetPassword',controller.forgetPassword);
router.post('/auth/forgetPasswordVertifyOTP',controller.forgetPasswordVertifyOTP)

module.exports=router;