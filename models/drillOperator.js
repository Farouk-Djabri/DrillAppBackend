const jwt=require("jsonwebtoken")

const bcrypt=require("bcryptjs")
const mongoose=require("mongoose")
const DrillOperatorSchema=new mongoose.Schema(
{
    name:{
    type:String,
    required:[true,"must provide name"],
    trim:true,
    
    },
email:{
    type:String,
    required:[true,"must provide email"],
    match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
   
    
    },
password:{
    type:String,
    required:[true,"must provide name"],
    trim:true,
    
    },
    operating:{type:Boolean,
        default: false  },
    
        superviserId:{
            type:mongoose.Types.ObjectId,
            ref:"drillSupervisor",
            unique: true,
            sparse: true
          
         },
        projectId:{
       type:mongoose.Types.ObjectId,
       ref:"project",
       unique: true,
       sparse: true
     
    }

}




)

module.exports=mongoose.model("drillOperator",DrillOperatorSchema)