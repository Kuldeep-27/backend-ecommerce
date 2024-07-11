const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true

    },

    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("deliveryInfo",deliverySchema);