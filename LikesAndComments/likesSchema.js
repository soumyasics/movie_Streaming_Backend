const mongoose= require("mongoose");

const sSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
       
    },
    liked:{
        type:Boolean,
        default:false
    },
    
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'movies',
       
    },
   
});
module.exports=mongoose.model('likes',sSchema)

