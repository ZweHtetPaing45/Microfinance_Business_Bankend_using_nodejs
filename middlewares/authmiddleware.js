const dotenv=require('dotenv');
dotenv.config({path: './config.env'});

const jwt=require('jsonwebtoken');

module.exports= (req,res,next)=>{

    try{
        const headers=req.headers.authorization;

    if(!headers){
        res.status(400).send({
            message: 'headers error '+ error.message
        })
    }

    const token=headers.split(' ')[1];

    if(!token){
        res.status(400).send({
            message: `Token error ${error.message}`
        })
    }

    const decoded=jwt.verify(token,process.env.SCRET_KEY);

    if(!decoded){
        res.status(400).send({
            message: `decoded error ${error.message}`
        })
    }

    req.user={id: decoded.userId};

    next();

    }catch(error){
        res.status(500).send({
            message: error.message
        })
    }
    
}