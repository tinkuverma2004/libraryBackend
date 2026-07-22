const bcrypt = require ("bcrypt")
const user = require("../models/user")
const jwt = require("jsonwebtoken")
const generateToken = require("../utils/generateToken")




const addUser = async (req, res) => {
  try {
    const { name, age, email, password, gender, phone, role } = req.body;

    // Validation
    if (!name || !age || !email || !password || !gender || !phone || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check existing user
    const existingUser = await user.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = await user.create({
      name,
      age,
      email: email.toLowerCase(),
      password: hashedPassword,
      gender,
      phone,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User Added Successfully",
      data: newUser,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



const loginUser = async (req,res)=>{

  const { email, password } = req.body
    console.log("login body:", req.body);

  try {

    const result = await user.findOne({ email })

    if (!result) {
      return res.send("user not found")
    }

    
    const isMatch = await bcrypt.compare(
      password,
      result.password
    )

    if (!isMatch) {
      return res.send("wrong password")
    }

    let users= {
       id: result._id,
      email: result.email,
       role: result.role
    }
    
    const token = generateToken(users)

    res.status(200).send({
      success : true ,
      data : {token ,result },
      message: "login successfully"


    })

   
    console.log(token);
    
  } catch (error) {

    console.log(error)

    res.send(error)

  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await user.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).send({
      success: true,
      data: updatedUser,
      message: "User updated successfully"
    });

  } catch (error) {
    res.status(500).send(error);
  }
};




const searchUser = async (req, res) => {
  try {
    const { search } = req.query;

    const foundUser = await user.findOne({
      $or: [
        { email: search },
        { name: search }
      ]
    }).select("-password");

    if (!foundUser) {
      return res.send({
        success: false,
        message: "User not found"
      });
    }

    res.send({
      success: true,
      data: foundUser
    });

  } catch (err) {
    res.send({
      success: false,
      message: "Search failed"
    });
  }
};
module.exports = {addUser , loginUser ,updateUser ,searchUser}
