const express =require('express')
const multer = require('multer')
const { registration, login, resetpassword, forgetpassword } = require('../Controller/usercontroller')
const {upload}= require('../helper/multerStorage')
const { verifyToken } = require('../Middleware/JWTverify')

let userRoutes = express.Router()



userRoutes.post('/registerUser',upload.single("profilepic"),registration)
// userRoutes.post('/registerUser',upload.array("profilepic",3),registration)

userRoutes.post('/login',login)
    userRoutes.post('/resetpassword',verifyToken,resetpassword)
userRoutes.post('/forgetpassword',forgetpassword)

module.exports={userRoutes}