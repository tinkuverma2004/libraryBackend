const mongoose = require('mongoose');
 
async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected");
    
    }

    catch (error) {
        console.log(error);
        
       
    }   
}

    module.exports = connectDB;