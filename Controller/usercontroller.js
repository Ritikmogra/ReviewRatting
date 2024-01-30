const {userModel} = require('../Models/usermodels')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer")

var jwt = require('jsonwebtoken');
require('dotenv').config()

const path = require ('path')
const { hashPass,comparepassword} = require('../helper/bcrypt');


const registration = async(req,res)=>{
    let {email} = req.body
    if(!validator.isEmail(email)){return res.status(400).send({success:false,message:'Email validation failed'})}
    // let filelocation =path.join(__dirname,`../${req.file.destination+req.file.filename}`) for image 
    let user = await userModel.findOne({email:req.body.email})
    
    if(user){

        return res.status(409).send({success:false,message:'Email already exist'})
    }
        let hasspassword = await hashPass(req.body.password)
        let newuser = await userModel.create({...req.body,password:hasspassword,profilepic:filelocation})
    //   console.log(newuser)
      res.status(201).send({success:true,message:'Registered Successfully',data:newuser})
    }



     let login = async(req,res)=>{

    let {email,password}=req.body;
    let user = await userModel.findOne({email:email})

    if(!user){return res.status(404).send({success:false,message:"Email not exist"})}
    const matchedpassword = await comparepassword(password,user.password);
if(!matchedpassword){return res.status(409).send({success:false,message:'Wrong Password'})}

var token  =jwt.sign({user:user},process.env.JWTKEY,{expiresIn: 60 * 60})
res.setHeader("token",token)
res.status(200).send({success:true,message:'Login Successfully', data:user,token:token})
}

let resetpassword = async(req,res)=>{
    try{
        let user = await userModel.findOne({email:req.body.email})
        if(!user){return res.status(400).send({success:false,message:"invalid email"})}
        if (req.body.newpassword != req.body.confirmpassword){return res.status(400).send({success:false,message:"passsword not matched"})}
    let newHashpassword = await hashPass(req.body.newpassword);
    // console.log(user)
    let newdataupdate = new userModel(user)
    newdataupdate.password = newHashpassword;
    newdataupdate.save();
    res.status(200).send({success:true,message:"Reset password successfully" })
}catch(error) {
    res.status(500).send({success:false,message:"server crashed"})
}
}
let forgetpassword = async (req,res)=>{
    // let user = await userModel.findOne({email:req.body.email})
    // if (!user){return res.status(400).send({status:false,message:"Email not found"});}
    try{
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"ritikmogra123@gmail.com",
                pass:"mykd itap byur zbvf",
            },
        });
        let details = {
            from:"ritikmogra123@gmail.com",
            to: req.body.email,
            subject:"hellow its me",
            text:"hellow its me user",
        };
        transporter.sendMail(details,async(err)=>{
            if (err){
                res.status(400).send({status:false,message:err.message});
            }else {
                res.status(200).send({status:false,message:"Email send"});
        }
    })
} catch (error)  {
    res.status(500).send({status:false,message:'Server Crashed'});
}
}
module.exports={registration,login,resetpassword,forgetpassword}