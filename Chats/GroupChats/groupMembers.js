const mongoose = require("mongoose");

const gSchema = new mongoose.Schema(
  {
    
    groupId:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,
     ref:'groups'
      
    },
    memberId:{
        type: mongoose.Schema.Types.ObjectId,
       
       ref:'users'
        
      },
      adminId:{
        type: mongoose.Schema.Types.ObjectId,
       ref:'users'
        
      },
      isActive:{
        type:Boolean,
        default:false
      },
      status:{
        type:Boolean,
        default:true
      }
  

  },
  { timestamps: true }
);

const Message = mongoose.model("groupmembers", gSchema);

module.exports = Message;
