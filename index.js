const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const app = express()

// middleware
app.use(express.json())
app.use(cors())

// connection to db
const connectionDB = async ()=>{
    const res =await mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true})
    if(res){
        console.log('connection success')
    }else{
        throw Error ('not connected to db!')
    }
}
connectionDB()

// router

// router api food
const foodRouter = require('./routes/food.js')
app.use('/api/food',foodRouter)

// router api auth
const authRouter = require('./routes/auth.js')
app.use('/api/auth',authRouter)

// router api user
const userRouter = require('./routes/user.js')
app.use('/api/user',userRouter)

// router api sale food
const saleFoodRouter = require('./routes/saleFood')
app.use('/api/salefood',saleFoodRouter)

const PORT =process.env.PORT

app.listen(PORT,()=>console.log(`server running on port ${PORT}...`))