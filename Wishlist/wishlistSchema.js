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
        
            movieId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "movies",
                required: true,
  
              },
      
    },
{timestamps:true})
const wishlists = mongoose.model("wishlists", sSchema);
module.exports = wishlists;