const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    avatar:{
        publicId:String,
        url:String
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
    
},
{
  timestamps:true
})

module.exports = mongoose.model("user", userSchema);