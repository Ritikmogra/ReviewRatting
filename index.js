const express = require('express');
require('./Dbconnection/connection')
const {userRoutes} = require('./Routes/userRouter')
const {companyRoutes} = require('./Routes/companyRoutes')

const app = express();
let PORT = 7000
app.use(express.json())


// app.get('/ritik',(req,res)=>{
//     res.send("ritik mogra is hero")
// })
// app.post('/ritika',(req,res)=>{
//     console.log(req.body)
//     if(!req.body.email){
//         res.send("email required")
//     }
//     res.send("ok")
// })
app.use('/user',userRoutes)
app.use('/company',companyRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})