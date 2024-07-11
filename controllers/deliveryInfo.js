const DeliveryInfo = require("../models/DeliveryInfo");

const { error, success } = require("../utils/response");

const saveDeliveryInfo = async (req,res) => {
    try{
        
        const {address,city,state,country,pincode} = req.body;
        const userId = req._id;

        const user = await DeliveryInfo.findOne({user:userId});

        if(user){
            user.address = address;
            user.city = city;
            user.state = state;
            user.country = country;
            user.pincode = pincode;
            await user.save();
            return res.send(success(200,user));
            
        }
        else{
           const newUser =  await DeliveryInfo.create({
                user:userId,
                address,
                city,
                state,
                country,
                pincode
            })

            return res.send(success(200,newUser));
        }

        

    } catch(e){
        return res.send(error(500,e.message));
    }
}

const getDeliveryInfo = async (req,res) => {
    try{
        const userId = req._id;

        const user = await DeliveryInfo.findOne({user:userId});

        if(!user)
        {
            return res.send(success(200,{address:"",city:"",state:"",country:"",pincode:""}));
        }

        return res.send(success(200,user));

    } catch(e){
        return res.send(error(500,e.message));
    }
}

const getDeliveryInfoForParticularUser = async (req,res) => {
    try{
        const {userId} = req.body;

        const user = await DeliveryInfo.findOne({user:userId}).populate("user");
        

        if(!user)
        {
            return res.send(success(200,{user:"",address:"",city:"",state:"",country:"",pincode:""}));
        }

        return res.send(success(200,user));

    } catch(e){
        return res.send(error(500,e.message));
    }
}

module.exports = {
    saveDeliveryInfo,
    getDeliveryInfo,
    getDeliveryInfoForParticularUser
}