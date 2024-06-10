const mongoose= require("mongoose");

const userSchema=mongoose.Schema({
   name:{
        type:String,
       
        required:true,
       
    },
    
    contact:{
        type:String,
        
        required:true,
       
    },
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
 
    password:{
        type:String,
        required:true
    },
   
    state:{
        type:String,
        required:true

    },
    pincode:{
        type:String,
        required:true

    },
    nationality:{
        type:String,
        required:true

    },
 
    dob:{
        type:Date,
        required:true

    },
    gender:{
        type:String,
        required:true

    },
    isActive:{
        type:Boolean,
        default:true
    }
});
module.exports=mongoose.model('users',userSchema)

