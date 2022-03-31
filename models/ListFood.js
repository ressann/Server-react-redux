const mongoose= require('mongoose')

const ListFoodShema = new mongoose.Schema({
    title:{type:String,required,unique:true},
    type:{type:String},
    content:{type:Array}
},
    {timestamps:true}
)

module.exports = mongoose.model("ListFood",ListFoodShema)