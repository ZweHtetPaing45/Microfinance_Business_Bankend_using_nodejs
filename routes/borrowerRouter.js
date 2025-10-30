const router=require('express').Router();

const controller=require('../controller/borrowerController');
const authmiddleware=require('../middlewares/authmiddleware');

router.post('/borr/borrower',authmiddleware,controller.borr);
router.get('/borr/allBorrower', authmiddleware,controller.getALLBorrower);

module.exports=router;