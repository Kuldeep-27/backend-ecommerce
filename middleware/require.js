const jwt = require("jsonwebtoken");
const { error } = require("../utils/response");
const User = require("../models/User");

const isLogin = async (req, res, next) => {
  
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.send(error(401, "Authorization header is required"));
  }

  const accessToken = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req._id = decoded._id;

    next();
  } catch (e) {
    

    return res.send(error(401, "Please Login First"));
  }
};

const isAdmin = async (req,res,next) => {
    
    try{

    
    const userId = req._id;

    const user = await User.findById(userId);

    if(user.role === "user")
      return res.send(error(400,"Only Admin can have access"));

    next();   
    } catch(e){
        return res.send(error(500,e.message));
    }
}

module.exports = {
    isLogin,
    isAdmin,

}
