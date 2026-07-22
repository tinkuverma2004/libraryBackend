const mongoose =require('mongoose')

const fineSchema= new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  issueBookId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"issuedBook",
    required:true
  },
  amount:{
    type:Number,
    required: true
  },
  paid:{
    type:Boolean,
    default:false
  },
  paidAt:{
    type:Date,
    default:null
  },
  paidAmount:{
    type:Number,
    default:0
  },
  unpaidAmount:{
    type:Number,
    
  }
  
})
module.exports = mongoose.model("Fine", fineSchema);