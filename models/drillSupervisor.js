const jwt=require("jsonwebtoken")

const bcrypt=require("bcryptjs")
const mongoose=require("mongoose")
const DrillSupervisorSchema=new mongoose.Schema(
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
    supervising:{type:Boolean,
        default: false  },
    
        
   projectId:{
       type:mongoose.Types.ObjectId,
       ref:"project",
       unique: true,
       sparse: true
     
    },
    OperatorId:{
        type:mongoose.Types.ObjectId,
        ref:"drillOperator",
        unique: true,
        sparse: true
      
     }
    
},




)

module.exports=mongoose.model("drillSupervisor",DrillSupervisorSchema)