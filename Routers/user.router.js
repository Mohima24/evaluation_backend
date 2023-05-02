const express = require('express')
const userRouter = express.Router();
const Usermodel = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authentication = require('../middleware/authentication')
userRouter.get('/',(req,res)=>{
    let x =new Date('2000-10-24T00:00:00.000+00:00')
    console.log(x.getDate())
    res.send("user page")
})

userRouter.get('/users/:id/friends',async( req,res)=>{
    let ID = req.params.id;
    let finduser = await Usermodel.findOne({_id:ID})
    if(finduser){
        res.send(finduser.friendRequests)
    }
})

userRouter.post('/register',async(req,res)=>{
    try{
        const {
            name,
            email,
            password,
            dob,
            bio,
          } = req.body;
          let finduser = await Usermodel.findOne({email})
          if(finduser){
            console.log(finduser)
            res.status(500).send({"msg":"already log in"})
          }else{
            bcrypt.hash(password, 7, async(err, hash) => {
                if(err){
                    res.status(500).send({"error":err})
                }else{
                    const payload = await Usermodel({
                        name,
                        email,
                        password:hash,
                        dob,
                        bio,
                        posts:[],
                        friends:[],
                        friendRequests:[]
                      })
                      await payload.save()
                    res.status(201).send({"msg":"user has created"})
                }
            })
          }
    }catch(err){
        console.log(err)
        res.send({"error":err})
    }
})

userRouter.post('/login',async(req,res)=>{
    try{
        const {
            email,
            password
          } = req.body;
          let finduser = await Usermodel.findOne({email})
          if(finduser){
            bcrypt.compare(password, finduser.password, async(err, result) => {
                if(result){
                    let token = jwt.sign({ userID : finduser._id}, 'userkey')
                    res.status(200).send({"msg":"user has login","token":token})
                }else{
                    res.status(500).send({"error-msg":"while hashing db password","error":err})
                }
            })            
          }else{
            res.status(500).send({"msg":"already log in"})
          }
    }catch(err){
        console.log(err)
        res.send({"error":err})
    }
})

userRouter.post('/users/:id/friends',authentication,async(req,res)=>{
    const userID = req.body.userID;
    const freindID = req.params.id;
    try{
        let user = await Usermodel.findOne({_id:userID})
        user.friendRequests.push(freindID)
        await user.save()
        res.status(201).send(user)
    }catch(err){
        res.status(403).send({"msg":"error while sending freindrqst"});
    }
})

userRouter.patch('/users/:id/friends/:friendId',authentication,async(req,res) =>{
    let userID = req.params.id;
    let freindID = req.params.friendId;
    try{
        let userDetails = await Usermodel.findOne({_id:userID})
        let freinds = userDetails.friendRequests;
        let newfreindsData = freinds.filter((el)=>{
            return el != freindID
        })
        await Usermodel.findByIdAndUpdate({_id:userID},{friendRequests:newfreindsData})
        res.send({"msg":"freind request removed"})
    }catch(err){
        res.send({"err":err})
    }
})



module.exports = userRouter;

// {
//     "name":"mohima",
//     "email":"mohima@gmail.com",
//     "password":"mohima",
//     "dob":"2000-10-24",
//     "bio":"dsgasjkglk"
//     }