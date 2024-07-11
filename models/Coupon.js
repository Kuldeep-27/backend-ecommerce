const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
    coupon:{
        type:String,
        required:true
    },
    percentOff:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("coupon",couponSchema);

