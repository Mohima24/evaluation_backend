const express = require("express")
require('dotenv').config()
const cors= require("cors")
const {connection}= require("./config/db")
const {userRouter} = require("./router/user.router")
const {postRouter} = require("./router/post.rout")
const {aunthentication} = require("./middleWare/authenticate")
const app= express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("home page")
})
app.use(cors())
app.use("/users",userRouter)
app.use(aunthentication)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try{
        connection
        console.log(`Listening to http://localhost:${process.env.port}`)
    }
    catch(err){
        console.log(err)
        console.log("Error while connecting to the mongoose server")
    }
})
