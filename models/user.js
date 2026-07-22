const mongoose= require("mongoose")





const userSchema= new mongoose.Schema({
    

    name:{ type: String, required: true },
    age:{ type: Number },
    email:{ type: String, unique: true },
    phone:{type: Number, unique:true, required:true},
    gender:{type:String },
    password:{type:String, required:true},
    role:{
        type:String,
        enum:["user" ,"admin"],
        default:"user"

    }
    

})


module.exports= mongoose.model("user", userSchema);

