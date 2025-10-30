const borrowers=require('../models/Borrower');
const users=require('../models/user');

const borr= async (req,res)=>{
    
    try{


        const user=await users.findOne({_id: req.user.id})

        if(!user){
            res.status(400).send({
                message: "user not found"
            })
        }

        const {name,price,rate}=req.body;

        const numPrice= parseFloat(price);

        const numRate= parseFloat(rate);
        
        let priceRate= numRate/100 * numPrice;

        const irtp= priceRate + numPrice;

        const OMD= irtp/30;

        const borrowerDate=await new borrowers({
            name: name,
            price: numPrice,
            rate: numRate,
            priceRate: priceRate,
            irtp,
            OneMonthInDay: OMD
        })

        const saveBorrwerData=await borrowerDate.save();


        res.status(201).send({
            message : "successful",
            success: true,
            borrData: saveBorrwerData
        })


    }catch(error){
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}

const getALLBorrower=async (req,res)=>{
    try{

        const user= await users.findOne({_id: req.user.id});

        if(!user){
            res.status(400).send({
                message: 'Not found Data',
                success: false
            })
        }

        const ALLBorrower= await borrowers.find();

        res.status(201).send({
            message: "All the Borrower data",
            success: true,
            data: ALLBorrower
        })

    }catch(error){
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}


module.exports={
    borr,
    getALLBorrower
}