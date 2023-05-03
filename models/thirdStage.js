const mongoose=require("mongoose")

const ThirdStageSchema = new mongoose.Schema({
    initialDate:Date,
    initialized:{type:Boolean,
      default: false  },
  
    finalDate:Date,
       
    previousFinishedStage:{type:Boolean,
        default: false  },
    StageProgress:Number,
    Project_Progress:Number,
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
    intermediateHoleSize:Number,
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
},{timestamps:true }

)
  
module.exports=mongoose.model("thirdStage",ThirdStageSchema)

