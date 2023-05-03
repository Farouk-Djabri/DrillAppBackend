const mongoose=require("mongoose")

const SecondStageSchema = 
new mongoose.Schema({
    initialDate:Date,
    initialized:{type:Boolean,
      default: false  },
      previousFinishedStage:{
        type:Boolean,          
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
    surfaceHoleSize:Number,
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
  
module.exports=mongoose.model("secondStage",SecondStageSchema)

