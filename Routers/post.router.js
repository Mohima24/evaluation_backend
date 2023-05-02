const express = require('express')
const postRouter = express.Router();
const Postmodel = require('../models/post.model');
const Usermodel = require('../models/user.model');
const authentication = require('../middleware/authentication');

postRouter.get('/posts',async(req,res)=>{
    let posts = await Postmodel.find()
    res.send(posts)
})

postRouter.get('/posts/:id',async(req,res)=>{
    const postID = req.params.id;
    try{
        const post = await Postmodel.findById({_id:postID})
        res.status(200).send(post)
    }
    catch(err){
        res.send({"error":"while get data by postID"})
    }
})

postRouter.post('/posts',authentication,async(req,res)=>{
    let userID = req.body.userID;
    const user = await Usermodel.findOne({_id:userID})
    const {
        text,
        image
      } = req.body;
      try{
        const payload = await Postmodel({
            user:userID,
            text,
            image,
            createdAt: Date.now(),
            comments:[],
            likes:[]
          })
          await payload.save();
          user.posts.push(payload._id);
          await user.save();
          res.status(201).send({"msg":"post has been posted"})
      }catch(err){
        console.log(err)
        res.status(501).send({msg:"while post a posts"})
      }
})

postRouter.patch('/posts/:id',authentication,async(req,res)=>{
    const postID = req.params.id;
    const userID = req.body.userID;
    const {text,image} = req.body;
    try{
        const postData = await Postmodel.findOne({_id:postID});
        if(postData.user == userID){
            await Postmodel.findByIdAndUpdate({_id:postID},{text,image})
            res.status(204).send({msg:"post has been updated"})
        }else{
            res.status(500).send({msg:"you are not authorized"})
        }
    }catch(err){
        res.status(501).send({"error":err,"msg":"while edit the post"})
    }
})

postRouter.delete('/posts/:id',authentication,async (req,res)=>{
    const postID = req.params.id;
    const userID = req.body.userID;
    const user = await Usermodel.findById({_id:userID})

    try{
        const postData = await Postmodel.findOne({_id:postID});
        if(postData.user == userID){
            await Postmodel.findByIdAndDelete({_id:postID})            
            res.status(204).send({msg:"post has been updated"})
        }else{
            res.status(500).send({msg:"you are not authorized"})
        }
    }catch(err){
        res.status(501).send({"error":err,"msg":"while edit the post"})
    }
})
postRouter.post('/posts/:id/like',authentication,async (req,res)=>{
    const postID = req.params.id;
    const userID = req.body.userID;
    try{
        const postData = await Postmodel.findOne({_id:postID});
        postData.likes.push(userID);
        await postData.save();
    }catch(err){
        res.status(501).send({"error":err,"msg":"while edit the post"})
    }
})
postRouter.post('/posts/:id/comment',authentication,async (req,res)=>{
    const postID = req.params.id;
    const userID = req.body.userID;
    const {text} = req.body.text;
    try{
        const postData = await Postmodel.findOne({_id:postID});
        const payload ={text,user:userID,createdAt:Date.now()}
        postData.comments.push(payload);
        await postData.save();
    }catch(err){
        res.status(501).send({"error":err,"msg":"while edit the post"})
    }
})

module.exports = postRouter;