const mongoose= require("mongoose");

const sSchema=mongoose.Schema({
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'movies',
        required:true,
       
    },
    
    date:{
        type:Date,
    },
   
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
       
    },
 
},{timestamps:true});
module.exports=mongoose.model('history',sSchema)

