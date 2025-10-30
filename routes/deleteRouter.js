const router=require('express').Router();

const controller=require('../controller/deleteController');
const authmiddleware=require('../middlewares/authmiddleware');

router.delete('/delete',authmiddleware,controller.deleteBor);

module.exports=router;