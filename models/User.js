const mongoose = require('mongoose')

const UserShema = new mongoose.Schema({
    username:{type:String,require:true,unique:true},
    avatar:{type:String,default:''},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    isAdmin:{type:Boolean,default:false}
},
{timestamps:true})

module.exports = mongoose.model("User",UserShema)