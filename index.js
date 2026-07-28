const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bcrypt = require('bcrypt')
const generateToken = require('./utils/generateToken')
const AuthMiddleware = require ("./middleware/AuthMiddleware")
const userRoutes=require("./routes/userRoutes")
const bookRoutes=require("./routes/bookRoutes")
const fineRoutes = require("./routes/fineRoutes")
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.use("/uploads" , express.static("uploads"))
app.use("/" ,fineRoutes)
app.use("/",bookRoutes)
app.use("/user", userRoutes);



app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
});