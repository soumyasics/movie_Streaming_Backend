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
        remainingDays:{
            type: Number
        },
        expired:{
            type: Date,
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
        year:{
            type: String,
        },
        month:{
            type: String,
        }

    },
{timestamps:true})
const complaint = mongoose.model("usersubscriptions", sSchema);
module.exports = complaint;