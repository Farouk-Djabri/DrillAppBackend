const mongoose=require("mongoose")

const FirstStageSchema = new mongoose.Schema({
  initialDate:Date,
  initialized:{type:Boolean,
    default: false  },

  finalDate:Date,
    Project_Progress:Number,
    StageProgress:Number,
    CompletedStage:{type:Boolean,
        default: false  },
    projectId:{
        type:mongoose.Types.ObjectId,
        ref:"project",
        unique: true,
        sparse: true
      },
    casing:{
        weight:Number,
        grade:String,
state:String,


},
cementing:{
    state:String,
    
         
      
},
sectionProgress:Number,

section:{
    ConductorHoleSize:Number,
    isFinished:{type:Boolean,
        default: false  },
     
        depth:{
        type:Number,
        default: 0
        },
    finalDepth:Number,
    depthInProgress:{
      type:Number,
      default: 0
      },}
},
)
  
module.exports=mongoose.model("firstStage",FirstStageSchema)

