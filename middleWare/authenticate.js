const jwt = require("jsonwebtoken")
require("dotenv").config()

const aunthentication = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decode= jwt.verify(token,process.env.key)
        if(decode){
            const ususerId = decode.userId
            const userName = decode.userName
            req.body.userId=ususerId;
            req.body.userName= userName;
            next()
        }else{
            res.send("Please logged in first")
        }
    }else{
        res.send("Please logged in first")
    }
}

module.exports={
    aunthentication
}