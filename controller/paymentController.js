const payments=require('../models/payment');
const users=require('../models/user');
const borrower=require('../models/Borrower');

const pay= async (req,res)=>{

    try{

        const user=await users.findOne({_id: req.user.id});

        if(!user){
            res.status(400).send({
                message: 'User not found',
                success: false
            })
        }

        const {price,name}=req.body;

        const BorrowerData=await borrower.findOne({name: {$regex: new RegExp(`^${name}$`, 'i')}});

        // console.log(BorrowerData);
        if(!BorrowerData){
            return res.status(404).send({
                success: false,
                message: "Borrower not found"
            });
        }

        const lastPayment = await payments.findOne({name: BorrowerData.name}).sort({date: -1});

        const newDay =lastPayment ? lastPayment.day + 1 : 1;

        //ဆပ်ရမယ့်ငွေကြေး
        //ဆပ်ထားသောပိုက်ဆံ

        const paymentData=await new payments({
            name: BorrowerData.name,
            price: BorrowerData.price,
            rate: BorrowerData.rate,
            priceRate: BorrowerData.priceRate,
            irtp : BorrowerData.irtp,
            dayPrice: price,
            day: newDay
        });

        await paymentData.save();

        res.status(201).send({
            message: "All Data",
            success : true,
            data: paymentData
        })


    }catch(error){
        res.status(500).send({
            message: error.message
        })
    }

}

const payOneList= async (req,res)=>{
    try{

        const user=await users.findOne({_id: req.user.id});

        if(!user){
            res.status(400).send({
                message: 'User not found',
                success: false
            })
        }

        const {name}=req.body;

        const displayList=await payments.find({name: name});

        if(!displayList){
            res.status(400).send({
                message: 'do not display list',
                success: false
            })
        }

        const calculus=await payments.find({name: name},{dayPrice: 1, _id : 0});

        const total=calculus.reduce((sum, item)=> sum + Number(item.dayPrice),0);

        const remainprice=await payments.findOne({name: name},{irtp: 1,_id: 0});

        const numremainprice=Number(remainprice.irtp);

        const totalRemailPrice=numremainprice - total;

        // console.log(numremainprice);

        res.status(201).send({
            message: "All the Display list",
            success: true,
            list: displayList,
            totalPay: total,
            totalRemailPrice: totalRemailPrice,
            totalAmount: numremainprice
        });

    }catch(error){
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}


module.exports={
    pay,
    payOneList
}