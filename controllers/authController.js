const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");
const { error, success } = require("../utils/response");
const bcrypt = require("bcrypt");


const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.send(error(400, "All Fields Are Required"));

    const user = await User.findOne({ email });

    if (user) return res.send(error(400, "User Already Exists"));

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashPassword,
    });

    return res.send(success(201, "User Created Successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const loginController = async(req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password) 
           return res.send(error(400,"Email and Password are required"));

        const user = await User.findOne({email}).select("+password");
        
        if(!user)
          return res.send(error(400,"User Does Not Exists"));

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        
        if(!isPasswordMatch)
           return res.send(error(400,"Incorrect Password"));

        const token =  generateToken(user._id,process.env.JWT_SECRET_KEY,"30d");
        const refreshToken = generateToken(user._id,process.env.JWT_REFRESH_KEY,"1y");

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
          });

        return res.send(success(200,{message:"Login Successfully",token}))   


    } catch(e){
        return res.send(error(500,e.message));
    }
}



  const logoutController = async (req, res) => {
    try {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
      });
  
      return res.send(success(200, "User logged out"));
    } catch (e) {
      return res.send(error(500, e.message));
    }
  };

module.exports = {
    signupController,
    loginController,
   
    logoutController
}
