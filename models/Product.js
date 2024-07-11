
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },

    image:{
        publicId:String,
        url:String
    },
    description:{
        type:String,
    }


})

module.exports = mongoose.model("product", productSchema);