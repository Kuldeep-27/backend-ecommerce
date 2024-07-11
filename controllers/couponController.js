const Coupon = require("../models/Coupon");
const { error, success } = require("../utils/response");




const saveCoupon = async (req,res) => {
    try{
        const {coupon,percentOff} = req.body;
      const newCoupon =  await Coupon.create({
            coupon,
            percentOff
        })

        return res.send(success(200,newCoupon));

    } catch(e){
        return res.send(error(500,e.message));
    }
}


const deleteCoupon = async (req,res) => {
    try{
        const {couponId} = req.body;

        await Coupon.deleteOne({_id:couponId});

        return res.send(success(200,"Coupon Deleted"));

    } catch(e){
        return res.send(error(500,e.message));
    }
}

const checkCoupon = async(req,res) => {
    try{
        const {couponCode} = req.body;

        const isValid = await Coupon.findOne({coupon:couponCode});

        if(!isValid)
        {
            return res.send(success(200,{off:0,message:"Not Valid"}))
        }

        return res.send(success(200,{off:isValid.percentOff,message:"Valid"}))


    } catch(e){
        return res.send(error(500,e.message));
    }

}

const getAllCoupons = async (req,res) => {

    try{
        const coupons = await Coupon.find();

        return res.send(success(200,coupons));

    } catch(e){
       return res.send(error(500,e.message));
    }
}


module.exports = {
    saveCoupon,
    getAllCoupons,
    deleteCoupon,
    checkCoupon
}