const router=require('express').Router();

const controller=require('../controller/paymentController');
const authmiddleware=require('../middlewares/authmiddleware');

router.post('/payment/payment',authmiddleware,controller.pay);
router.post('/payment/payList',authmiddleware,controller.payOneList);

module.exports=router;