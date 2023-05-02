const jwt = require('jsonwebtoken')

const authentication = async(req,res,next)=>{
    let token = req.headers.authorization;
    // console.log(token)
    if(token){
        jwt.verify(token, 'userkey', async(err, decoded) => {
            if(err){
                res.status(403).send({"msg":"plz log in first"})
            }else{
                req.body.userID = decoded.userID;
                next()
            }
        })
    }else{
        res.status(403).send({"msg":"plz log in first"})
    }
}
module.exports = authentication