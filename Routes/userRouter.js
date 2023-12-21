
const express =require('express')
const { registration, login } = require('../Controller/usercontroller')
let userRoutes = express.Router()

userRoutes.get('/',(req,res)=>{
    res.send("userRoutes")
})

userRoutes.post('/registerUser',registration)
userRoutes.post('/login',login)

module.exports={userRoutes}