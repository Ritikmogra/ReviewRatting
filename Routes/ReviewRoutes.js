const express =require('express')
const { addReview,updateReview,deleteReview} = require('../Controller/Reviewcontroller')
const {verifyToken} = require('../Middleware/JWTverify')


const ReviewRoutes = express.Router()

ReviewRoutes.post("/addReview",addReview)
ReviewRoutes.put("/updatereview/:id",verifyToken,updateReview)
ReviewRoutes.delete("/deletereview/:id",verifyToken,deleteReview)




   
module.exports={ReviewRoutes}
