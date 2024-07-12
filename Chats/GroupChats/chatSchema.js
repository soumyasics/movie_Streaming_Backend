const mongoose = require("mongoose");

const mSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
      
    },
    
    groupId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups"
    
    },
    memberId:{
      type: mongoose.Schema.Types.ObjectId,
     ref:'users'
      
    },
    date:{
      type: Date,
      required: true,
    }

  },
  { timestamps: true }
);

const Message = mongoose.model("groupmessages", mSchema);

module.exports = Message;
