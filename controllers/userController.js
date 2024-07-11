const User = require("../models/User");
const { error, success } = require("../utils/response")


const getUserInfo = async (req,res) => {
    try{
        const userId = req._id;
        

        const user = await User.findById(userId);
        

        return res.send(success(200,user));

    } catch(e){
        return res.send(error(500,e.message));
    }
}

module.exports = {
    getUserInfo
}