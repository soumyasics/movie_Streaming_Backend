const mongoose = require("mongoose");
const { Schema } = mongoose;
const subSchema = new Schema(
    {
       
       
        title:{
            type: String,
            required:true
            },
            price:{
              type: Number,
              required: true,
            },
        
            description: {
            type: String,
            required:true

        },
        noOfMonth: {
            type: Number,
            required: true,           
        }
    })
const complaint = mongoose.model("subscriptions", subSchema);
module.exports = complaint;