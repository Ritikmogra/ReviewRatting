const {companymodels} =require("../Models/companymodels")

let createcompany=async(req,res)=>{
    let oldcompany = await companymodels.findOne({companyName:req.body.companyName})
    if(oldcompany){return res.status(400).send({success:false,message:"company Already exit"})}

    let newcompany = await companymodels.create(req.body)
    res.status(201).send({success:true,message:"company created",data:newcompany})

    
}
let companylist = async(req,res)=>{
    let allcompany = await companymodels.find()
    console.log(allcompany.length)
    if(allcompany.length==0){return res.status(404).send({success:false,message:"No Company found "})}
    res.status(200).send({success:true,message:"All company",total_Companys:allcompany.length,data:allcompany})

}
module.exports={createcompany,companylist}