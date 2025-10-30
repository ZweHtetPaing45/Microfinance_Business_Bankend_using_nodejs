const borrowers=require('../models/Borrower');
const users=require('../models/user');
const payments=require('../models/payment');


const deleteBor=async (req,res)=>{

        try{

            const user= await users.findOne({_id: req.user.id});

    if(!user){
        res.status(400).send({
            message: 'user not found',
            success: false
        })
    }

    const {name}=req.body;

    const deleteBorrower=await borrowers.deleteOne({name: name});

    const deletePayment=await payments.deleteMany({name: name});

    res.status(201).send({
        message: "Delete success",
        success: true
    })


        }catch(error){
            res.status(500).send({
                message: error.message,
                success: false
            })
        }

}

module.exports={
    deleteBor
}