const mongoose= require('mongoose')

const SaleFoodShema = new mongoose.Schema({
    customer:{type:Array,required:true},
    order:{type:Array},
    totalPrice:{type:Number},
},
    {timestamps:true}
)

module.exports = mongoose.model("SaleFood",SaleFoodShema)