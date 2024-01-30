const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://ritikmogra123:PmehPtLKfRPWcqGX@cluster0.uuxf8tw.mongodb.net//priyanshi').then(()=>console.log('connected!')).catch(()=>
{console.log("Not connected")});