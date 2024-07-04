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
    },
    profileStatus:{
        type:Boolean,
        default:false
    },
    paymentStatus:{
        type:Boolean,
        default:false
    },
    paymentPlan:{
        type:String,
        default:'Nil'
    },
    preferredLanguages:{
        type:Array,
        default:null
        },
        preferredGenre:{
            type:Array,
            default:null 
        },
        img:{
            type:Object,
            // required:true
        }
});
userSchema.pre('save', function (next) {
    if (this.preferredLanguages && this.preferredLanguages.length > 0 && this.preferredGenre && this.preferredGenre.length > 0) {
      this.profileStatus = true;
    } else {
      this.profileStatus = false;
    }
    next();
  });

module.exports=mongoose.model('users',userSchema)

