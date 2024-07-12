const mongoose = require("mongoose");

const gSchema = new mongoose.Schema(
  {
    
    adminId:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,
     ref:'users'
      
    },
   title:{
    type:String,
    required:true
   },
  
status:{
  type:Boolean,
  default:true
}
 ,
  isActive:{
    type:Boolean,
  default:false
  },},
  { timestamps: true }
);

const Message = mongoose.model("groups", gSchema);

module.exports = Message;
