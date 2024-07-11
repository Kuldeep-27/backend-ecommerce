const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { success,error } = require("../utils/response");



const createOrder = async (req,res) => {
   try{
    const {discount} = req.body;
    const userId = req._id;

    const userCart = await Cart.findOne({user:userId}).populate("items.productId");
    
    

    const items = [];
    for (const item of userCart.items) {
        items.push({
            price: item.productId.price,
            product: item.productId._id,
            quantity: item.quantity
        });
    
        const quantity = item.quantity;
        const productId = item.productId._id;
        const product = await Product.findById(productId);
        product.stock -= quantity;
        await product.save();
    }

    await Cart.deleteOne({user:userId});

    const userOrder = await Order.findOne({user:userId});

    if(!userOrder)
    {
        await Order.create({
            user:userId,
            orders:[
                {
                    items,
                    discount
                }
            ]
        })

        return res.send(success(200,"Order Confirmed"));
    }
    else{
        userOrder.orders.unshift({
            items,
            discount
        })

        await userOrder.save();
        return res.send(success(200,"Order Placed"));
    }


   } catch(e){
    return res.send(error(500,e.message));
   }



}

const getUserOrders = async (req,res) => {

    try{
        const userId = req._id;

        const orders = await Order.findOne({user:userId})
                                   .populate("user")
                                   .populate("orders.items.product");
    
        return res.send(success(200,orders)); 

    } catch(e){
        return res.send(error(500,e.message));
    }
                              



}

const getAllOrders = async (req,res) => {
    try{
        const orders = await Order.find()
                                  .populate("user")
                                  .populate("orders.items.product")

        return res.send(success(200,orders));                          

        


    } catch(e){
        return res.send(error(500,e.message));
    }
}

const getParticularOrder = async (req,res) => {
    try{
       
        const {userId,orderId} = req.body;

        const userOrder = await Order.findOne({user:userId})
                                     .populate("orders.items.product");
        
       const index = userOrder.orders.findIndex((order) =>order._id.toString() === orderId )    
       
       
       return res.send(success(200,userOrder.orders[index]));

    } catch(e){
        return res.send(error(500,e.message));
    }
   


}

const changeStatus = async (req,res) => {
    try{
        const {userId,orderId,status} = req.body;

        const userOrder = await Order.findOne({user:userId});

        const index = userOrder.orders.findIndex((order) => order._id.toString() === orderId);

        userOrder.orders[index].status = status;

        await userOrder.save();

        return res.send(success(200,"Status Updated Successfully"));



    } catch(e){
        return res.send(error(500,e.message));
    }
}

const getMyOrders = async (req,res) => {
    try{
        const userId = req._id;
        const userOrder = await Order.findOne({user:userId})
                                     .populate("orders.items.product");

        return res.send(success(200,userOrder));


    } catch(e){
        return res.send(error(500,e.message));

    }
}

const getMyParticularOrder = async (req,res) => {
    try{
       
        const {orderId} = req.body;
        const userId = req._id;

        const userOrder = await Order.findOne({user:userId})
                                     .populate("orders.items.product");
        
       const index = userOrder.orders.findIndex((order) =>order._id.toString() === orderId )    
       
       
       return res.send(success(200,userOrder.orders[index]));

    } catch(e){
        return res.send(error(500,e.message));
    }
   


}



module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    getParticularOrder,
    changeStatus,
    getMyOrders,
    getMyParticularOrder
}