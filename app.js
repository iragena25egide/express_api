const { error } = require('@hapi/joi/lib/base');
const express=require('express');
const bosyParser=require('body-parser');
const mysql=require('mysql');
const app=express();
const router=require("./routes/router");

app.use(bosyParser.json());
app.use("/",router);
app.get('/',(req,res)=>{
    res.send('am trying to learn express.js');
})

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"NODE_API"
});

connection.connect(error=>{
    if(error){
        console.error(error);
    }else{
        console.log('app is now connected to mysql db!');
    }
}
    
);






app.listen(3000,()=>{console.log('app is now listen to the server')});