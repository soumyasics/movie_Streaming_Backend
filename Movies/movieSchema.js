const mongoose= require("mongoose");

const movieSchema=mongoose.Schema({
   name:{
        type:String,
       
        required:true,
       
    },
    
    genre:{
        type:String,
        
        required:true,
       
    },
    director:{
        type:String,
       
        required:true,
       
       
    },
 
    scriptWriter:{
        type:String,
        required:true
    },
   
    duration:{
        type:String,
        required:true

    },
    releaseDate:{
        type:Date,
        required:true

    },
    description:{
        type:String,
        required:true

    },
 
    language:{
        type:String,
        required:true

    },
    thumbnail:{
        type:Object,
        required:true

    },
    isActive:{
        type:Boolean,
        default:false
    },
    adminApproved:{
        type:Boolean,
        default:false
    },
    video:{
        type:Object,
        required:true
        },
        rating:{
            type:Number,
            default:0
        },
        adults:{
            type:Boolean,
        default:false
        }
  
      
});

module.exports=mongoose.model('movies',movieSchema)

