const router=require('express').Router();
const { query } = require('express');
const bcrypt=require('bcrypt');
const mysql=require('mysql');
const hapi=require('@hapi/joi');
const Joi = require('@hapi/joi');
const { schema } = require('@hapi/joi/lib/compile');

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"NODE_API"
});

connection.connect(error=>{
}
    
);
const userSchema=Joi.object({
    name:Joi.string().min(12).max(20).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).max(8).required()
    
     });



router.post('/register',async(req,res)=>{
    
 const{name,email,password}=req.body;
 
 const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
 const salt=bcrypt.genSalt(10);
 const hashed=await bcrypt.hash(password,parseInt(salt));
 
   const data=`insert into user(name,email,password) values('${name}','${email}','${hashed}')`;

    connection.query(data,(err,dt)=>{
        if(err){
            console.log(err);
        }else{
            res.send('new data inserted welll')
        }
    })

   
    
    
});

router.get('/get',async(req,res)=>{
    connection.query("select* from user",(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send({data});
        }
    })
})



router.put('/update/:id',async(req,res)=>{
    const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
 
    const{name,email,password}=req.body;
    const salt=bcrypt.genSalt(10);
 const hashed=await bcrypt.hash(password,parseInt(salt));
    const data=`update user set name='${name}',email='${email}',password='${hashed}' where id=0009`;

    connection.query(data,(err,dt)=>{
        if(err){
            console.log(err);
        }else{
            res.send('new data Updated welll')
        }
    })


});

router.delete('/delete/:id',async(req,res)=>{

 const data="delete from user where id=001";

    connection.query(data,(err,dt)=>{
        if(err){
            console.log(err);
        }else{
            res.send('deleted welll')
        }
    })

});








module.exports = router;