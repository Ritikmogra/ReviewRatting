const express =require('express')
const {createcompany,companylist,singleCompany, companyDelete} =require("../Controller/companycontroller")
const {upload} = require('../helper/multerStorage');
const { verifyToken } = require('../Middleware/JWTverify');
const companyRoutes=express.Router();

companyRoutes.post("/",upload.single("company_logo"),createcompany)
companyRoutes.get("/companylist",companylist)
companyRoutes.get("/singleCompany/:id",singleCompany)



companyRoutes.delete('/:id',verifyToken,companyDelete)




module.exports = {companyRoutes}