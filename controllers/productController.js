const { error, success } = require("../utils/response");
const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;

const addNewProduct = async (req,res) => {
    
    try{
        const {name,stock,price,category,description,image} = req.body;

        if(!name || !stock || !price || !category || !description || !image)
            return res.send(error(400,"All Fields Are Required"));
        
            const cloudImg = await cloudinary.uploader.upload(image, {
                folder: "Products",
              });    

              

          const newProduct = await Product.create({
            name,
            stock,
            price,
            category,
            description,
            image:{
                publicId:cloudImg.public_id,
                url:cloudImg.url
            }

        })


        

        return res.send(success(200,newProduct))


    } catch(e){
        return res.send(error(500,e.message));
    }
}

const latestProduct = async (req,res) => {
    try{
        const last4Products = await Product.find()
        .sort({ _id: -1 }) 
        .limit(8);

        return res.send(success(200,last4Products));
        

    } catch(e){
        res.send(error(500,e.message));
    }
}

const allProducts = async(req,res) => {
    try{
        const products = await Product.find();

        return res.send(success(200,products));

    } catch(e){
        return res.send(error(500,e.message));
    }
}

const updateProduct = async (req,res) => {
    try{
        const {name,price,stock,category,image,description,productId} = req.body;

        const product = await Product.findById(productId);

        if(name)
          product.name = name;
        if(price)
          product.price = price;
        if(stock)
          product.stock = stock;
        if(category)
          product.category = category;
        if(description)
          product.description = description;

        if(image){
            await cloudinary.uploader.destroy(product.image.publicId);

            const cloudImg = await cloudinary.uploader.upload(image, {
                folder: "Products",
              });

            product.image = {
                publicId:cloudImg.public_id,
                url:cloudImg.url
            }  

           


        }  

        await product.save();

        return res.send(success(200,product))




    } catch(e){
        return res.send(error(500,e.message));
    }
}

const deleteProduct = async (req,res) => {
    try{
        const {productId} = req.body;



        const product = await Product.findById(productId);

        await cloudinary.uploader.destroy(product.image.publicId);
        



        await Product.deleteOne({_id:productId});

        res.send(success(200,"Product Deleted"));



    } catch(e){
        return res.send(error(500,e.message));
    }
}

const getProductInfo = async (req,res) => {
    try{
        const {productId} = req.body;
        const product = await Product.findById(productId);

        return res.send(success(200,product));

    } catch(e){
        return res.send(500,e.message);
    }
}

const searchProduct = async (req,res) => {
    try{
        const {query} = req.body;

    if(query === "")
      return res.send(success(200,[]));

    const result = await Product.find({
        name: { $regex: new RegExp(query, "i") },
    });

   return res.send(success(200,result));
    } catch(e){
        return res.send(error(500,e.message));
    }


}



module.exports = {
    addNewProduct,
    latestProduct,
    allProducts,
    updateProduct,
    deleteProduct,
    getProductInfo,
    searchProduct
}