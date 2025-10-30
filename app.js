const express=require('express');
const cors=require('cors');

const app=express();

const authRouter=require('./routes/authRouter');
const borrRouter=require('./routes/borrowerRouter');
const payRouter=require('./routes/payRouter');
const deleteRouter=require('./routes/deleteRouter');

app.use(cors());
app.use(express.json());

app.use('/api',authRouter);
app.use('/api',borrRouter);
app.use('/api', payRouter);
app.use('/api',deleteRouter);

module.exports=app;