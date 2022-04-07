const SaleFood = require('../models/SaleFood')
const router = require('express').Router()
const Verify = require('../middleware/Verify')

// add data when customer buy food
router.post('/add',Verify,async (req,res)=>{
    if(req.user){
        try{
            const Sale = new SaleFood({
                customer:req.body.customer,
                order:req.body.order,
                totalPrice:req.body.totalPrice,
            })

            const saveSale = await Sale.save()
            res.status(200).json(saveSale)

        }catch(err){
            res.json(err)
        }
    }else{
        res.json('please create your account!')
    }
})

// get data sale food 
router.get('/',Verify,async (req,res)=>{
    if(req.user.isAdmin){
        try{
            const data = await SaleFood.find()
            res.status(200).json(data)
        }catch(err){
            res.json(err)
        }
    }else{
        res.json('you are not allow!')
    }
})

// delete data sale 
router.delete('/delete/:id',Verify,async (req,res)=>{
    if(req.user.isAdmin){
        try {
            const sale = await SaleFood.findByIdAndDelete(req.params.id)
            res.status(200).json('Data has been deleted.')
        } catch (error) {
            res.json(error)
        }
    }else{
        res.json('you are not allow!')
    }
})

module.exports = router;