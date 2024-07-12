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
        required:true,
       ref:'users'
        
      },
  

  },
  { timestamps: true }
);

const Message = mongoose.model("groupmembers", gSchema);

module.exports = Message;
