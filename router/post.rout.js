const {PostModel}= require("../module/postmodule")
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    let device= req.query
    let data = await PostModel.find(device)
    res.send(data)
})

postRouter.post("/posts",async(req,res)=>{
    const {title,body,device,userId,userName}= req.body;
    const postData = new PostModel({title,body,device,userId,userName})
    await postData.save()
    res.send("User has been posted posts")
})
postRouter.post("/update",async(req,res)=>{
    let paramid = req.params.id;
    let data = await PostModel.findOne({_id:paramid})
    let requserid= req.body.userId;
    if(data){
        let userId = data.userId;
        if(userId==requserid){
            await PostModel.findByIdAndUpdate({_id:paramid})
            res.send("post has been updated")
        }else{
            res.send("You are not authorized for update this posts")
        }
    }
    else{
        res.send("You are not authorized for updated this posts")
    }
})
postRouter.delete("/delete/:id",async(req,res)=>{
    let paramid = req.params.id;
    let data = await PostModel.findOne({_id:paramid})
    let requserid= req.body.userId;
    if(data){
        let userId = data.userId;
        if(userId==requserid){
            await PostModel.findByIdAndDelete({_id:paramid})
            res.send("post has been deleted")
        }else{
            res.send("You are not authorized for delete this posts")
        }
    }
    else{
        res.send("You are not authorized for delete this posts")
    }
})
module.exports={
    postRouter
}

// {
//     "title":"bye",
//     "body":"abcd",
//     "device":"mobile"
//   }