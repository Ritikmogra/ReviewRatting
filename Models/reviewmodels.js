const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            require: true,
        },
        review: {
            type: String,
            require: true,
        },
        rating: {
            type: Number,
            require: true,
        },
        isActive: {
            type: Boolean,
            require: true,
        },
        company_Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usermodels",
        },
        user_Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usermodels",

        },
    },
    {timestamps: true}
); 
let reviewmodels = new mongoose.model("reviewmodels",reviewSchema);
module.exports = {reviewmodels};



