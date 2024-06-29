const mongoose= require("mongoose");

const cSchema=mongoose.Schema({
   name:{
        type:String,
       
        required:true,
       
    },image:{
type:Object,

    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"movies",
        required:true
    }

    
      
});

module.exports=mongoose.model('casts',cSchema)