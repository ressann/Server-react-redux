const express =require('express')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const dotenv = require('dotenv').config()

const router = express.Router()

// register user
router.post('/register',async (req,res)=>{
    try {
        const addUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:CryptoJS.AES.encrypt(JSON.stringify(req.body.password),process.env.SECRET_KEY).toString(),
            isAdmin:req.body.isAdmin,
            avatar:req.body.avatar
        })
        const saveUser = await addUser.save()

        const accessToken = jwt.sign(
            {id:saveUser._id,isAdmin:saveUser.isAdmin},
            process.env.SECRET_KEY,
            {expiresIn:"4d"}
        )

        const {password,...info}=saveUser._doc

        res.status(200).json({info,accessToken})
    } catch (error) {
        res.status(500).json(error)
    }
})

// user login
router.post('/login',async (req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.json('wrong email!')
        }else{
            const bytes  = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY);
            const originalPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            if(originalPassword !== req.body.password){
                res.json('wrong password!')
            }else{
                const accessToken = jwt.sign(
                    {id:user._id,isAdmin:user.isAdmin},
                    process.env.SECRET_KEY,
                    {expiresIn:"4d"}
                )

                // hash password
                const {password,...info}= user._doc
                
                res.json({info,accessToken})
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;
