const jwt= require("jsonwebtoken")

const generateToken = (user)=>{
  return jwt.sign(
    user, "secretkey" , {expiresIn:"7d"} )
}
module.exports =  generateToken;


