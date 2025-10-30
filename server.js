const app=require('./app');

const dotenv=require('dotenv');

dotenv.config({path: './config.env'});

const dbConfig=require('./config/dbConfig.js');

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
});
