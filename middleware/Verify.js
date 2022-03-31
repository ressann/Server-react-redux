const jwt = require('jsonwebtoken')

const Verify = async (req,res,next)=>{

        const authHeader = req.headers.token

        if(authHeader){
           const token =authHeader.split(' ')[1]

            jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
                if(err){
                    res.status(403).json('Token is not valid!')
                }else{
                    //user get this info {id:user._id,isAdmin:user.isAdmin} by process.env.SECRET_KEY and insert info to req.user
                    req.user = user
                    next()
                }
            })
        }else{
            res.status(401).json('Not Authorized!')
        }
}

module.exports = Verify;
