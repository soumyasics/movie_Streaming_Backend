const mongoose = require("mongoose");
const { Schema } = mongoose;
const complaintSchema = new Schema(
    {
       
       
            userId:{
              type: mongoose.Schema.Types.ObjectId,
              ref: "users"
            
            },
          date:{
              type: Date,
              required: true,
            },
        
        complaint: {
            type: String,
            required:true

        },
        actionTaken: {
            type: String
           
        }
    })
const complaint = mongoose.model("complaints", complaintSchema);
module.exports = complaint;