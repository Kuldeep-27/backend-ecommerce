const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product"
            },
            quantity:{
                type:Number
            }
        }
    ]

})

module.exports = mongoose.model("cart",cartSchema);