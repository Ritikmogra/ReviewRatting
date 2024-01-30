const os = require("os")
const express = require('express');
require('./Dbconnection/connection')
const {userRoutes} = require('./Routes/userRouter')
const {companyRoutes} = require('./Routes/companyRoutes');
const { ReviewRoutes } = require('./Routes/ReviewRoutes');
require('dotenv').config()
require('./Dbconnection/connection')

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use('/user',userRoutes)
app.use('/company',companyRoutes)
app.use('/Review',ReviewRoutes)

// console.log(os.cpus())

// console.log(os.arch())

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})