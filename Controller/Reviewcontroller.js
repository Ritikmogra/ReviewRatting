const {reviewmodels}=require('../Models/reviewmodels')


let addReview=async(req,res)=>{
    let findcompany =await companymodels.findOne({company_id:req.body.company_id})
    let(!findcompany
        )
    let newRatting = await reviewmodels.create(req.body)
    res.status(201).send({success:true,message:'Review created',data:newRatting})


}
const updateReview = async(req,res)=>{

    try {
      let review = await reviewmodels.findOne({_id:req.params.id});
      if(req.userID !=review.user_id){return res.status(400).send({success:false,message:"not authorized"})}
      let updateReview = await reviewmodels.findByIdAndUpdate(req.params.id,req.body,{new:true})
      if (!updateReview) return res.status(400).send({success:false,message:"couldnot update"})
      res.status(200).send({success:true,message:"Review Updated",data : updateReview})
    } catch (error) {
      res.status(500).send({success:false,message:"Server Crashed",error:error.message})
    }
    }
    const deleteReview = async(req,res)=>{
      try{
        let review = await reviewmodels.findOne({_id:req.params.id});
        if(req.userID !=review.user_id){return res.status(400).send({success:false,message:"Not Authorized"})}
        await reviewmodels.findByIdAndDelete(req.params.id)
        res.status(200).send({success:true,message:"Review deleted"})
      }catch(error) {
        res.status(500).send({success:false,message:"Server crashed",error:error.message})
      }
      }


module.exports={addReview,updateReview,deleteReview}
