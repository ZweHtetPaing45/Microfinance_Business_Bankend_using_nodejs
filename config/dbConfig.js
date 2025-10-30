const mongoose=require('mongoose');

const dotenv=require('dotenv');

dotenv.config({path : './config.env'});

mongoose.connect(process.env.MONGODB_URI);

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('Database connection successful');
})

db.on('error',()=>{
    console.log('Do not database connection');
})

module.exports=db;