const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MONGODB CONNECTED SUCCESSFULLY")

    }
    catch(error){
        console.log("Error in MongoDB connection ",error);
        
        process.exit(0);

    }
}

module.exports = connectDB;