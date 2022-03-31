const mongoose= require('mongoose')

const FoodShema = new mongoose.Schema({
    title:{type:String,require:true,unique:true},
    details:{type:String},
    price:{type:Number,require:true},
    type:{type:String,require:true},
    image:{type:String,require:true},
    genre:{type:String}
},
    {timestamps:true}
)

module.exports = mongoose.model("Food",FoodShema)