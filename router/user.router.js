const {UserModel}= require("../module/usermodule")
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()

userRouter.get("/all",(req,res)=>{
    res.send("All the student")
})
userRouter.post("/register", async(req,res)=>{
    const {name,email,gender,password}= req.body
    try{
        bcrypt.hash(password,7,async(err,secure_pass)=>{
            if(err){
                console.log(err)
                res.send("While register user")
            }else{
                const user = await UserModel({name,email,gender,password:secure_pass})
                await user.save()
                res.send("user has been register")
            }
        })
    }
    catch(err){
        console.log(err)
        res.send("register try catch error")
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user = await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password, function(err, result) {
                if(result){
                    const token= jwt.sign({"userId":user[0]._id,"userName":user[0].name},process.env.key,{expiresIn:"1h"})
                    res.send({"msg":"user has been loggedin","token":token})
                }else{
                    res.send("Please logged ")
                }
                
            });
        }
    }
    catch(err){
        console.log(err)
        res.send("Error while log in")
    }
})

module.exports={
    userRouter
}


// {
//     "name": "mohima",
//     "email":"mohima@gmail.com",
//     "gender": "femail",
//     "password": "mohima"
// }