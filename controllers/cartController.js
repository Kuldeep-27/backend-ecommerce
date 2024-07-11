const Cart = require("../models/Cart");
const { error, success } = require("../utils/response");
const Product = require("../models/Product");


const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
   
    const userId = req._id;

    const product = await Product.findById(productId);

    if (!product) return res.send(error(500, "Product Not Found"));

    if (product.stock === 0) {
      return res.send(error(500, "Currently UnAvailable In Stock"));
    }

    

    const user = await Cart.findOne({ user: userId });

    if (user) {
      const index = user.items.findIndex(
        (product) => product.productId.toString() === productId.toString()
      );

    

      if (index !== -1) {
       return res.send(error(500,"Already in Cart"))

       
      } else {
        user.items.push({
          productId,
          quantity: 1,
        });

        await user.save();
       
      }
    } else {
      await Cart.create({
        user: userId,
        items: [
          {
            productId,
            quantity: 1,
          },
        ],
      });
    
    }
    const cartInfo = await Cart.findOne({ user: userId })
      ?.populate("user")
      ?.populate("items.productId");

    return res.send(success(200, cartInfo));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

const getCartItems = async (req, res) => {
  try {
    const userId = req._id;

    const cartInfo = await Cart.findOne({ user: userId })
      ?.populate("user")
      ?.populate("items.productId");

    

    res.send(success(200, cartInfo));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req._id;

    const userCart = await Cart.findOne({ user: userId });

    const index = userCart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    

    userCart.items.splice(index, 1);

    await userCart.save();

    return res.send(success(200, "Item Removed Successfully"));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

const incrementQuantity = async (req,res) => {
  try{
    
    const {productId} = req.body;
   
    const userId = req._id;

    const userCart = await Cart.findOne({user:userId});
   

    const product = await Product.findById(productId);
    const stock = product.stock;


    const index = userCart.items.findIndex((item) => item.productId.toString() === productId.toString());

    const quantity = userCart.items[index].quantity;
    if(quantity >= stock/2)
      return res.send(error(500,`Maximum Quanity upto ${quantity} only`));

    userCart.items[index].quantity++;
    userCart.save();

    return res.send(success(200,`Quantity Updated To ${quantity+1}`));

  } catch(e){
    return res.send(error(500,e.message));
  }

}

const decrementQuantity = async (req,res) => {
  try{
    const {productId} = req.body;
    const userId = req._id;

    const userCart = await Cart.findOne({user:userId});


    const index = userCart.items.findIndex((item) => item.productId.toString() === productId);

    const quantity = userCart.items[index].quantity;
    if(quantity === 1)
      return res.send(error(500,"Quantity cannot be 0"));

    userCart.items[index].quantity--;
    userCart.save();

    return res.send(success(200,`Quantity Updated To ${quantity-1}`));

  } catch(e){
    return res.send(error(500,e.message));
  }

}

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
  incrementQuantity,
  decrementQuantity
};
