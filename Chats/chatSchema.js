const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
      
    },
    from: {
      type: String,
      required: true,
    },
    support:{
      type:Boolean,
      default:false
    },

  
    fromId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    
    },
    toId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    
    },
   date:{
      type: Date,
      required: true,
    }

  },
  { timestamps: true }
);

const Message = mongoose.model("chats", messageSchema);

module.exports = Message;
