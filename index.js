const express = require('express')
const app = express()
const conncetion = require('./config/db')
const postRouter = require('./Routers/post.router');
const userRouter = require('./Routers/user.router');

app.use(express.json())

app.use('/api',userRouter)

app.use('/api',postRouter)


app.listen(8888,async()=>{
    console.log('http://localhost:8888')
    try{
        conncetion
        console.log("db connected")
    }catch(err){
        console.log("while connecting with mongodb")
    }
})
