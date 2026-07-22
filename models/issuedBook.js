const mongoose = require("mongoose")
const IssueBookSchema= new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  bookId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"book",
    required:true
  },
  issueDate:{
    type:Date,
    default:Date.now,
    required:true
  },
 
  isReturn:{
    type:Boolean,
    default:false
  },
  dueDate:{
    type:Date,
    required:true
  },
  actualReturnDate:{
    type:Date,
    default:null
  }
 
}
)
module.exports=mongoose.model("issuedBook",IssueBookSchema)



