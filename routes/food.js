const express = require('express')
const Food = require('../models/Food')
const Verify = require('../middleware/Verify')

const router = express.Router()

// add food 
router.post('/add',Verify,async (req,res)=>{
    if(req.user.isAdmin){
        try {
            const newFood = await Food({
                title:req.body.title,
                details:req.body.details,
                price:req.body.price,
                type:req.body.type,
                image:req.body.image,
                genre:req.body.genre
            })
            const saveFood = await newFood.save()
            res.status(200).json(saveFood)
        } catch (error) {
            res.json(error)
        }
    }else{
        res.json('you are not allow to add food!')
    }
})

// get all food 
router.get('/allfood',Verify,async (req,res)=>{
    if(req.user){
        try {
            const food = await Food.find()
            res.status(200).json(food)
        } catch (error) {
            res.json(error)
        }
    }else{
        res.json('you are not allow!')
    }
})

// get food by type and genre
router.get('/',Verify , async (req,res)=>{
    const type =req.query.type
    let food =[]
    try {   
        if(type){
            food = await Food.aggregate([
                {$match:{type:type}},
                {$sample:{size:10}}
            ])
        }else{
            food = await Food.aggregate([{$sample:{size:10}}])
        }

        res.status(200).json(food)

    } catch (error) {
        res.status(401).json(error)
    }
})

// update food by id
router.put('/update/:id',Verify,async (req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        try {
            const updateFood = await Food.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new:true}
            )
            res.status(200).json(updateFood)
        } catch (error) {
            res.json(error)
        }
    }else{
        res.json('you are not allow to update!')
    }
})

// delete food by id
router.delete('/delete/:id',Verify,async (req,res)=>{
    if(req.user.isAdmin){
        try {
            const deleteFood = await Food.findByIdAndDelete(req.params.id)
            res.status(200).json(deleteFood)
        } catch (error) {
            res.json(error)
        }
    }else{
        res.json('you are not allow to delete!')
    }
})

router.get('/test' ,async(req,res)=>{
    const type = req.query.type
    const food = await Food.find({type:type})
    res.json(food)
})

module.exports = router;