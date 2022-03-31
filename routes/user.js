const express = require('express')
const User = require('../models/User')
const Verify =require('../middleware/Verify')

const router = express.Router()

// get all user
router.get('/alluser',Verify,async (req,res)=>{
    if(req.user.isAdmin){
        try {
            const user = await User.find()
            res.status(200).json(user)
        } catch (error) {
            res.json(error)
        }
    }else{
        res.json('you are not allow to see all user!')
    }
})

// get user by id
router.get('/:id',Verify,async (req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        try {
            const user = await User.findById(req.params.id)
            res.status(200).json(user)
        } catch (error) {
            res.json(error)
        }
    }else{
        res.json('you are not allow!')
    }
})

// delete user by id
router.delete('/delete/:id',Verify,async (req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json(user)
        } catch (error) {
            res.json(error)
        }
    }else{
        res.json('you are not allow to delete this user!')
    }
})

// update user by id
router.put('/update/:id',Verify,async (req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password=CryptoJS.AES.encrypt(JSON.stringify(req.body.password),process.env.SECRET_KEY).toString()
        }
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new:true}
            )
            res.status(200).json(user)
        } catch (error) {
            res.json(error)
        }
    }else{
        res.json('you are not allow to update this user!')
    }
})

module.exports = router;