const users=require('../models/user');
const nodemailer=require('nodemailer');
const crypto=require('crypto');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 578,
    secure: false,
    requireTLS: true,
    auth : {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

const otpStore=new Map();

const generatedOtp= ()=> crypto.randomInt(100000,999999).toString();

const register=async (req,res)=>{

   try{

    const hashpassowrd=await bcryptjs.hash(req.body.password,10);

    req.body.password=hashpassowrd;

    const {username,email,password,phone}=req.body;



        const otp=generatedOtp();

        otpStore.set(email, {otp,username,hashpassowrd,phone});

        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP verification',
            text: `You otp is ${otp}`
        })

        res.status(201).send({
            message: 'User register.Please vertify OTP sent to email'
        })


    }catch(error){
        res.status(500).send({
            message: `register error ${error.message}`
        })
    }

}


const vertifyOTP=async (req,res)=>{

    try{

        const {email,otp}=req.body;

        const data=otpStore.get(email);

        if(!data){
            res.status(400).send({
                message: 'No OTP found.Please register again'
            })
        }

        if(data.otp !== otp){
            res.status(400).send({
                message: 'Invalid OTP code'
            });
        }

        const newUser=new users({
            username: data.username,
            phone: data.phone,
            email: email,
            password: data.hashpassowrd,
            isVerified: true
        });

        await newUser.save();
        otpStore.delete(email);

    res.status(200).send({
        message: 'Email verified successful'
    })


    }catch(error){
        res.status(500).send({
            message: error.message
        })
    }
}


const login= async (req,res)=>{
    try{

        const user=await users.findOne({username : req.body.username});

        if(!user){
            res.status(400).send({
                message: "incorrect username",
                success: false
            })
        }

        const isvalid=await bcryptjs.compare(req.body.password,user.password);

        if(!isvalid){
            res.status(400).send({
                message: `incorrect password ${error.message}`,
                success: false
            })
        }

        const token=jwt.sign({userId: user._id},process.env.SCRET_KEY,{expiresIn: '7d'});

        res.status(201).send({
            message: "user logged in successfully",
            success: true,
            data: token
        })
 
    }catch(error){

        res.status(500).send({
            message: `System error ${error.message}`,
            success: false
        })

    }
}

const forgetPassword= async (req,res)=>{
    try{

        const {email,phone}=req.body;

        const user=await users.findOne({email,phone});

        if(!user){
            res.status(400).send({
                message: "User not found",
                success: false
            })
        }

        const otp=generatedOtp();

        otpStore.set(email, {otp,phone});

        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP verification',
            text: `You otp is ${otp}`
        })

        res.status(201).send({
            message: "User Found",
            success: true
        })

        

    }catch(error){
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}

const forgetPasswordVertifyOTP=async (req,res)=>{
    try{

        const {email,otp}=req.body;

        const user=await users.findOne({email});

        const data=otpStore.get(email);

        // console.log(data);

        if(!data){
            res.status(400).send({
                message: 'No OTP found.Please register again'
            })
        }

        if(data.otp !== otp){
            res.status(400).send({
                message: 'Invalid OTP code'
            });
        }

                const token=jwt.sign({userId: user._id},process.env.SCRET_KEY,{expiresIn: '7d'});

                res.status(201).send({
                    message: "Successful",
                    success: true,
                    data: token
                })
        otpStore.delete(email);

    }catch(error){
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}

module.exports={
    register,
    vertifyOTP,
    login,
    forgetPassword,
    forgetPasswordVertifyOTP
}
