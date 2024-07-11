const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    orders:[
        {
            items:[
                {
                    price:{
                        type:Number,
                        required:true,
                    },
                    product:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"product",
                        required:true

                    },
                    quantity:{
                        type:Number,
                        required:true,
                    }
                }
            ],
            status:{
                type:String,
                enum:["Order Confirmed","Shipped","Out For Delivery", "Delivered"],
                default:"Order Confirmed"

            },
            statusDate: {
                type: Date,
                default: Date.now
            },
            discount:{
                type:Number,
                required:true
            }
        }

    ]
})

module.exports = mongoose.model("order",orderSchema);