const mongoose= require("mongoose");

const sSchema=mongoose.Schema({
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'movies',
        required:true,
       
    },
    review:{
        type:String,
        required:true
    },
    date:{
        type:Date,
    },
   
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
       
    },
 
});
module.exports=mongoose.model('reviews',sSchema)

