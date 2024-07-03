const mongoose = require("mongoose");
const { Schema } = mongoose;
const sSchema = new Schema(
    {
       
       
            userId:{
              type: mongoose.Schema.Types.ObjectId,
              ref: "users",
              required: true,

            },
          date:{
              type: Date,
              required: true,
            },
        
            subId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "subscriptions",
                required: true,
  
              },
        paymentStatus: {
            type: Boolean,
            default:false
           
        },
        expired:{
            type: Boolean,
            default:false
        },
        cardNo:{
            type: Number,
        },
        cardName:{
            type: String,
        },
        cvv:{
            type: Number,
        },
        cardexpiry:{
            type: String,
        }

    },
{timestamps:true})
const complaint = mongoose.model("usersubscriptions", sSchema);
module.exports = complaint;