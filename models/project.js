const mongoose=require("mongoose")

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      
    },
    coordinates: {
      type: [Number ],
      required: true
    }
  })
 ;
const ProjectSchema=new mongoose.Schema({
 ProjectProgress:{
    type:Number,
    default:0


},

 firstStagePr:Number,
 secondStagePr:Number,
 thirdStagePr:Number,
 lastStagePr:Number,

 
     number:{
        type:Number,
        unique:true,
    trim:true,
    
    },
    createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now }
,
    supervisorID:{ 
        type:mongoose.Types.ObjectId,
        ref:"drillSupervisor",
        unique: true,
        sparse: true
       },
       operatorID:{ 
        type:mongoose.Types.ObjectId,
        ref:"drillOperator",
        unique: true,
        sparse: true
       },
       adminId:{ 
        type:mongoose.Types.ObjectId,
        ref:"admin",
       },
     
       operated:{
        type:Boolean,
        default:false
       } ,
       supervised:{
        type:Boolean,
        default:false
       },
       firstStageGn:{
        type:Boolean,
        default:false
       } ,

       secondStageGn:{
        type:Boolean,
        default:false
       } ,

       thirdStageGn:{
        type:Boolean,
        default:false
       } ,

       lastStageGn:{
        type:Boolean,
        default:false
       } ,

    
     determinedTime:{
    type:String
    },
    

   basic_info:{
  contractor:String,
  cellarDepth:Number,
  wellProfile:String,
  gridSurfaceCoordinateSystem:String,
  SurfaceLontitude:Number,
 SurfaceLatitude:Number,
 TargetLontitude:Number,
 TargetLatitude:Number,
targetReservoir:{
    type:String
},

targetFormation:{
    type:String
},
// targetCordinations:{
//     type:pointSchema
// },
targetToleranceShape:{
    type:String
},
TdFormationDepth:{
    type:String
}
   },
   DirectionalPlan:{
    type:String
   }
}
,


)
      
  
module.exports=mongoose.model("project",ProjectSchema)

