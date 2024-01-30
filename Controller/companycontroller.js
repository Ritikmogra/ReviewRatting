const { companymodels } = require("../Models/companymodels")
const { reviewmodels } = require("../Models/reviewmodels")
const { upload } = require('../helper/multerStorage')
const path = require('path')


let createcompany = async (req, res) => {
    // let filelocation = path.join(__dirname, `../${req.file.destination + req.file.filename}`)
    let oldcompany = await companymodels.findOne({ companyName: req.body.companyName })
    if (oldcompany) { return res.status(400).send({ success: false, message: "company Already exit" }) }
    let newcompany = await companymodels.create(req.body)
    res.status(201).send({ success: true, message: "company created", data: newcompany })

}
let companylist = async (req, res) => {
    let allcompany = await companymodels.find()
    // console.log(allcompany.length)
    if (allcompany.length == 0) { return res.status(404).send({ success: false, message: "No Company found " }) }
    res.status(200).send({ success: true, message: "All company", total_Companys: allcompany.length, data: allcompany })
}

let singleCompany = async (req, res) => {
    try {
        console.log(req.params)
        let company = await companymodels.findById(req.params.id).populate("user_id")
        if (!company) { return res.status(404).send({ success: false, message: "No Company found" }) }
        let allreview = await reviewmodels.find ({company_id:req.params.id}).populate("user_id")
        res.status(200).send({ success: true, message: "Company found", data: company ,allreview:allreview,
        TotalReview:allreview.length })
    } catch (error) {
        res.status(500).send({success: false, message: "Catch data", data:error.message})
    }


}
const companyDelete = async(req,res)=>{
    try{

    let company = await companymodels.findById(req.params.id)
    if(!company){return res.status(200).send({success:true,message:"company doesn't exist"})}
if(req.userID != company.userID){return res.status(400).send({success:false,message:"not Authorized"})}
    await companymodels.findByIdAndDelete(company._id);
    res.status(200).send({success:true,message:"company deleted"})
}catch(error){
    res.status(500).send({success:false,message:"Server Crashed"})
}
}
const searchCompany = async(req,res)=>{
    let obj = {}
    try{
        let {companyName,location,city,founded} = req.body
        if(companyName){
            obj.companyName = companyName
        }
       else if(location){
            obj.location = location
        }
      else if(city){
            obj.city = city
        }
        else if(founded){
            obj.founded = founded
        }else{
            return res.status(400).send({success : false ,message:"Invalid search"})
        }
        let Company = await companymodels.find(obj)
        if(company.length ==0){res.status(404).send({success:false,message:"No company found"})}
        res.status(200).send({success:true,message:"All result",Total: company.length,data:company})
    }catch(error){
        res.status(500).send({success:false,message:"Server Crashed"})
    }

    }

module.exports = { createcompany, companylist, singleCompany,companyDelete }