
const asyncWrapper=require("../middlewares/async")
const drillOperator = require("../models/drillOperator")
const project = require("../models/project")
const SecondStage = require("../models/secondStage")
const ThirdStage = require("../models/thirdStage")
const mongoose=require("mongoose")
const FirstStage = require("../models/firstStage")

const LastStage = require("../models/lastStage")
const drillSupervisor = require("../models/drillSupervisor")
exports.registerDrillOpt= asyncWrapper (async(req,res)=>{
        
       console.log(req.body)
       
       res.status(200).json( await drillOperator.create(req.body))
})
exports.recieveProject= asyncWrapper (async(req,res)=>{
        
       let id =req.params.id
       
       res.status(200).json( await project.find({operatorID:id}))
})
exports.getSupervisor= asyncWrapper (async(req,res)=>{
        
  let id =req.params.id
  
  res.status(200).json( await drillSupervisor.find({OperatorId:id}))
})

exports.updateFirstStage= asyncWrapper (async(req,res)=>{
    let id= req.params.id2
    console.log(req.params.id2)
    console.log(req.body.casing, req.body.cementing)
   const stage= await FirstStage.findOne( {projectId:id})
   console.log(stage.initialized)
if (req.body.casing.state=="pending"  && req.body.cementing.state =="pending"	 ) {
  if (stage.initialized==false ) {
    
    if (req.body.section.depthInProgress < stage.section.finalDepth) {
      const num2=  req.body.section.depthInProgress / stage.section.finalDepth
        const progressedDepth=num2.toFixed(2)
        
        const num= 1-stage.section.depth
       const remainDepth=num.toFixed(2)
       
       if (stage.section.depth<1 && progressedDepth <=	remainDepth ) {
     
         const Stages= await FirstStage.findOneAndUpdate( {projectId:id},[
           { $set: 
              {
                "initialDate":req.body.initialDate,
               
                "casing.state":req.body.casing.state,
               "cementing.state":req.body.cementing.state,              
               "section.depthInProgress":
               { $add:
                     ["$section.depthInProgress", req.body.section.depthInProgress ] },
            } } ,
                 { $set: { "section.depth": { $divide: ["$section.depthInProgress","$section.finalDepth" ] }, 
                          } },
                  { $set:{
                         "sectionProgress":{ $multiply: [ "$section.depth",0.4 ] },
                      } },
                    { $set: {"StageProgress":{ $sum: [ "$sectionProgress",0 ] }  } }
                 
                    ,{ $set:{
                     "Project_Progress":{ $divide: [ "$sectionProgress",4 ] },
                  } },
                  { $set:{
                    "initialized":true,
                 } }             
                 
                 ]
                    ,{new:true})
                    const stageP= await FirstStage.findOne( {projectId:id} ) 
                    console.log(stageP.Project_Progress)  
             const projectProgress= await project.findOneAndUpdate({_id:id},[
                 { $set:{
                     "firstStagePr":stageP.Project_Progress,
                  } },
                 
                  { $set:{
                    "ProjectProgress":"$firstStagePr",
                 } },
               
              
                ]
                 ,{new:true}
                 )    
                 console.log(progressedDepth,remainDepth)
               if (progressedDepth == remainDepth) {
             await FirstStage.findOneAndUpdate( {projectId:id},{$set:{
                         "section.isFinished":true
                     }} ,
                      )
                     
                    }      
                    res.status(200).json({ Stages })     
                 }
             
             
             else{
              res.status(400).send({
                message: 'please provide a valid depth '
             })
                            }
            
                   }else{
                    res.status(400).send({
                      message: 'please provide a reasonable depth'
                   })                   
                   }
    }else{
      if (req.body.section.depthInProgress < stage.section.finalDepth) {
        const num2=  req.body.section.depthInProgress / stage.section.finalDepth
          const progressedDepth=num2.toFixed(2)
        
          const num= 1-stage.section.depth
         const remainDepth=num.toFixed(2)
         
         if (stage.section.depth<1 && progressedDepth <=	remainDepth ) {
           const Stages= await FirstStage.findOneAndUpdate( {projectId:id},[
             { $set: 
                {
                 
                  "casing.state":req.body.casing.state,
                 "cementing.state":req.body.cementing.state,              
                 "section.depthInProgress":
                 { $add:
                       ["$section.depthInProgress", req.body.section.depthInProgress ] },
              } } ,
                   { $set: { "section.depth": { $divide: ["$section.depthInProgress","$section.finalDepth" ] }, 
                            } },
                    { $set:{
                           "sectionProgress":{ $multiply: [ "$section.depth",0.4 ] },
                        } },
                      { $set: {"StageProgress":{ $sum: [ "$sectionProgress",0 ] }  } }
                   
                      ,{ $set:{
                       "Project_Progress":{ $divide: [ "$sectionProgress",4 ] },
                    } },
                   
                   ]
                      ,{new:true})
                      const stageP= await FirstStage.findOne( {projectId:id} ) 
                      console.log(stageP.Project_Progress)  
               const projectProgress= await project.findOneAndUpdate({_id:id},[
                   { $set:{
                       "firstStagePr":stageP.Project_Progress,
                    } },
                   
                    { $set:{
                      "ProjectProgress":"$firstStagePr",
                   } },
                 
                
                  ]
                   ,{new:true}
                   )    
                   console.log(progressedDepth,remainDepth)
                 if (progressedDepth == remainDepth) {
               await FirstStage.findOneAndUpdate( {projectId:id},{$set:{
                           "section.isFinished":true
                       }} ,
                        )
                       
                      }      
                      res.status(200).json({ Stages })     
                   }
               
               
               else{
                   res.status(500).json({ msg: 'enter valid depth' })
      
                              }
              
                     }else{
                       res.status(500).json({ msg: 'It is not reasonable' })
                       
                     }
        
    }
        
  }
else if(req.body.casing.state=="completed" &&  req.body.cementing.state =="completed" && stage.section.isFinished==true){

console.log(stage.StageProgress)
 const Stages= await FirstStage.findOneAndUpdate( {projectId:id}, [{ $set: 
     {
        "cementing.state":req.body.cementing.state, 
        "finalDate":req.body.finalDate,

        } } ,
        {$set: {"StageProgress":{ $sum: [ "$StageProgress",0.3 ] }  } },
{$set:{
 CompletedStage:true
}
}
,{ $set:{
 "Project_Progress":{ $sum: [ "$Project_Progress",(0.3/4 ) ] },
} },


],{new:true})

const stageP= await FirstStage.findOne( {projectId:id} ) 
console.log(stageP.Project_Progress)  
const projectProgress= await project.findOneAndUpdate({_id:id},[
{ $set:{
"firstStagePr":stageP.Project_Progress,
} },

{ $set:{
  "ProjectProgress":stageP.Project_Progress,
  } }
  


]
,{new:true}
)    
 await SecondStage.findOneAndUpdate({projectId:id},
  { $set:{
  "previousFinishedStage":true,
  } },
  {new:true}
  )    
      



      res.status(200).json({ Stages })
  
 

 } 
 
 

else if (req.body.casing.state=="completed" && req.body.cementing.state =="pending" && stage.section.isFinished==true) {
if (stage.StageProgress==0.7) {
 res.status(500).json({ msg: 'it is wrong' })

}else{
     const Stages= await FirstStage.findOneAndUpdate( {projectId:id}, [{ $set: 
         {"casing.state":req.body.casing.state,
            "cementing.state":req.body.cementing.state,              
          
                     } } ,
  { $set: {"StageProgress":{ $sum: [ "$sectionProgress",0.3 ] }  } }
  ,{ $set:{
     "Project_Progress":{ $sum: [ "$Project_Progress",(0.3/4 ) ] },
  } },

  
  
         ],{new:true})
         const stageP= await FirstStage.findOne( {projectId:id} ) 
         console.log(stageP.Project_Progress)  
  const projectProgress= await project.findOneAndUpdate({_id:id},[
      { $set:{
          "firstStagePr":stageP.Project_Progress,
       } },{ $set:{
        "ProjectProgress":stageP.Project_Progress,
        } }
      ]
      
     ,{new:true}
      
      )    
   
          res.status(200).json({ Stages })
      
         }        
    
 }else {
     res.status(500).json({ msg: 'Something went wrong, please try again' })
 }    

// const agr=await lastStage.aggregate([
//     { $match: { projectId:idToSearch} }
//  ,   { $project: { projectId: 1,"section.depth": { $divide: [ req.body.section.depthInProgress,"$section.finalDepth" ] } } }
// ])
//        res.status(200).json({  agr })
})

 exports.updateSecondStage= asyncWrapper (async(req,res)=>{
    let id= req.params.id2
    console.log(req.params.id2)
    console.log(req.body.casing, req.body.cementing)
   const stage= await SecondStage.findOne( {projectId:id})
   console.log(stage.initialized)
if (req.body.casing.state=="pending"  && req.body.cementing.state =="pending"	 ) {
  if (stage.initialized==false) {
    if (req.body.section.depthInProgress < stage.section.finalDepth) {
      const num2=  req.body.section.depthInProgress / stage.section.finalDepth
      const progressedDepth=num2.toFixed(2)
      
      const num= 1-stage.section.depth
     const remainDepth=num.toFixed(2)
    if (stage.section.depth<1 && progressedDepth <=	remainDepth ) {
    console.log(stage)
         const Stages= await SecondStage.findOneAndUpdate( {projectId:id},[
          { $set: 
            {
              "initialDate":req.body.initialDate,
             
              "casing.state":req.body.casing.state,
             "cementing.state":req.body.cementing.state,              
             "section.depthInProgress":
             { $add:
                   ["$section.depthInProgress", req.body.section.depthInProgress ] },
          } } ,
               { $set: { "section.depth": { $divide: ["$section.depthInProgress","$section.finalDepth" ] }, 
                        } },
                { $set:{
                       "sectionProgress":{ $multiply: [ "$section.depth",0.4 ] },
                    } },
                  { $set: {"StageProgress":{ $sum: [ "$sectionProgress",0 ] }  } }
               
                  ,{ $set:{
                   "Project_Progress":{ $divide: [ "$sectionProgress",4 ] },
                } },
                { $set:{
                  "initialized":true,
               } }             
               
               ]
                  ,{new:true})
                  const stageP= await SecondStage.findOne( {projectId:id} ) 
                  console.log(stageP.Project_Progress)  
           const projectProgress= await project.findOneAndUpdate({_id:id},[
               { $set:{
                   "secondStagePr":stageP.Project_Progress,
                } },
               
                { $set:{
                  "ProjectProgress": ["$firstStagePr","$secondStagePr"  ]
               } },
             
            
              ]
               ,{new:true}
               )    
               console.log(progressedDepth,remainDepth)
             if (progressedDepth == remainDepth) {
           await FirstStage.findOneAndUpdate( {projectId:id},{$set:{
                       "section.isFinished":true
                   }} ,
                    )
                   
                  }      
                  res.status(200).json({ Stages })     
               }
    
        //    { $set:    
        //              { 
        //               "initialDate":req.body.initialDate,
        //           "casing.state":req.body.casing.state,
        //        "cementing.state":req.body.cementing.state,              
        //        "section.depthInProgress":
        //        { $add:
        //              ["$section.depthInProgress", req.body.section.depthInProgress ] },
        //     } } ,
        //          { $set: { "section.depth": { $divide: ["$section.depthInProgress","$section.finalDepth" ] }, 
        //                   } },
        //           { $set:{
        //                  "sectionProgress":{ $multiply: [ "$section.depth",0.4 ] },
        //               } },
        //             { $set: {"StageProgress":{ $sum: [ "$sectionProgress",0 ] }  } }
                 
        //             ,{ $set:{
        //              "Project_Progress":{ $divide: [ "$sectionProgress",4 ] },
        //           } },
        //           ,{ $set:{
        //             "initialized":true
        //          } },
                
                 
        //          ]
        //             ,{new:true})
        //             const stageP= await SecondStage.findOne( {projectId:id} ) 
        //             console.log(stageP.Project_Progress)  
        //      const projectProgress= await project.findOneAndUpdate({_id:id},[
        //          { $set:{
        //              "secondStagePr":stageP.Project_Progress,
        //           } },
    
        //           { $set:{
        //             "ProjectProgress": { $add:
        //               ["$firstStagePr","$secondStagePr"  ] },
                  
        //           } }        
    
    
        //         ]
        //          ,{new:true}
        //          )    
        //  if (progressedDepth == remainDepth) {
        //      await SecondStage.findOneAndUpdate( {projectId:id},{$set:{
        //                  "section.isFinished":true
        //              }} ,
        //               )
                     
        //             }      
        //             res.status(200).json({ Stages })     
        //          }
             
             
             else{
                 res.status(500).json({ msg: 'enter valid depth' })
    
                            }
            
                   }else{
                     res.status(500).json({ msg: 'It is not reasonable' })
                     
                   }
        
  }else{
    if (req.body.section.depthInProgress < stage.section.finalDepth) {
      const num2=  req.body.section.depthInProgress / stage.section.finalDepth
      const progressedDepth=num2.toFixed(2)
      
      const num= 1-stage.section.depth
     const remainDepth=num.toFixed(2)
    if (stage.section.depth<1 && progressedDepth <=	remainDepth ) {
         const Stages= await SecondStage.findOneAndUpdate( {projectId:id},[
           { $set: 
              {"casing.state":req.body.casing.state,
               "cementing.state":req.body.cementing.state,              
               "section.depthInProgress":
               { $add:
                     ["$section.depthInProgress", req.body.section.depthInProgress ] },
            } } ,
                 { $set: { "section.depth": { $divide: ["$section.depthInProgress","$section.finalDepth" ] }, 
                          } },
                  { $set:{
                         "sectionProgress":{ $multiply: [ "$section.depth",0.4 ] },
                      } },
                    { $set: {"StageProgress":{ $sum: [ "$sectionProgress",0 ] }  } }
                 
                    ,{ $set:{
                     "Project_Progress":{ $divide: [ "$sectionProgress",4 ] },
                  } },
                 
                 
                 ]
                    ,{new:true})
                    const stageP= await SecondStage.findOne( {projectId:id} ) 
                    console.log(stageP.Project_Progress)  
             const projectProgress= await project.findOneAndUpdate({_id:id},[
                 { $set:{
                     "secondStagePr":stageP.Project_Progress,
                  } },
    
                  { $set:{
                    "ProjectProgress": { $add:
                      ["$firstStagePr","$secondStagePr"  ] },
                  
                  } }        
    
    
                ]
                 ,{new:true}
                 )    
         if (progressedDepth == remainDepth) {
             await SecondStage.findOneAndUpdate( {projectId:id},{$set:{
                         "section.isFinished":true
                     }} ,
                      )
                     
                    }      
                    res.status(200).json({ Stages })     
                 }
             
             
             else{
                 res.status(500).json({ msg: 'enter valid depth' })
    
                            }
            
                   }else{
                     res.status(500).json({ msg: 'It is not reasonable' })
                     
                   }
    
  }
}
else if(req.body.casing.state=="completed" &&  req.body.cementing.state =="completed" && stage.section.isFinished==true){

console.log(stage.StageProgress)
 const Stages= await SecondStage.findOneAndUpdate( {projectId:id}, [{ $set: 
     {"finalDate":req.body.finalDate,
        "cementing.state":req.body.cementing.state, 
                     
        } } ,
        {$set: {"StageProgress":{ $sum: [ "$StageProgress",0.3 ] }  } },
{$set:{
 CompletedStage:true
}
}
,{ $set:{
 "Project_Progress":{ $sum: [ "$Project_Progress",(0.3/4 ) ] },
} },


],{new:true})

const stageP= await SecondStage.findOne( {projectId:id} ) 
console.log(stageP.Project_Progress)  
const projectProgress= await project.findOneAndUpdate({_id:id},
[
  { $set:{
"secondStagePr":stageP.Project_Progress,

} },
{ $set:{
  "ProjectProgress": { $add:
    ["$firstStagePr","$secondStagePr"  ] },

} }]

,{new:true}
)    

await ThirdStage.findOneAndUpdate({projectId:id},
  { $set:{
  "previousFinishedStage":true,
  } },
  {new:true}
  )    



      res.status(200).json({ Stages })
  
 

 } 
 
 

else if (req.body.casing.state=="completed" && req.body.cementing.state =="pending" && stage.section.isFinished==true) {
if (stage.StageProgress==0.7) {
 res.status(500).json({ msg: 'it is wrong' })

}else{
     const Stages= await SecondStage.findOneAndUpdate( {projectId:id}, [{ $set: 
         {"casing.state":req.body.casing.state,
            "cementing.state":req.body.cementing.state,              
          
                     } } ,
  { $set: {"StageProgress":{ $sum: [ "$sectionProgress",0.3 ] }  } }
  ,{ $set:{
     "Project_Progress":{ $sum: [ "$Project_Progress",(0.3/4 ) ] },
  } },

  
  
         ],{new:true})
         const stageP= await SecondStage.findOne( {projectId:id} ) 
         console.log(stageP.Project_Progress)  
  const projectProgress= await project.findOneAndUpdate({_id:id},[
      { $set:{
          "secondStagePr":stageP.Project_Progress,
       } },
       { $set:{
        "ProjectProgress": { $add:
          ["$firstStagePr","$secondStagePr"  ] },
      
      } }
]      
     ,{new:true}
      
      )    
   
          res.status(200).json({ Stages })
      
         }        
    
 }else {
     res.status(500).json({ msg: 'Something went wrong, please try again' })
 }    

// const agr=await lastStage.aggregate([
//     { $match: { projectId:idToSearch} }
//  ,   { $project: { projectId: 1,"section.depth": { $divide: [ req.body.section.depthInProgress,"$section.finalDepth" ] } } }
// ])
//        res.status(200).json({  agr })
})


   exports.updateThirdStage= asyncWrapper (async(req,res)=>{
    let id= req.params.id2
   
    console.log(req.params.id2)
    console.log(req.body.casing, req.body.cementing)
   const stage= await ThirdStage.findOne( {projectId:id})
   console.log(stage.section.depth)
if (req.body.casing.state=="pending"  && req.body.cementing.state =="pending"	 ) {
  if (stage.initialized==false) {
    if (req.body.section.depthInProgress < stage.section.finalDepth) {
      const num2=  req.body.section.depthInProgress / stage.section.finalDepth
      const progressedDepth=num2.toFixed(2)
      
      const num= 1-stage.section.depth
     const remainDepth=num.toFixed(2)
    if (stage.section.depth<1 && progressedDepth <=	remainDepth ) {
         const Stages= await ThirdStage.findOneAndUpdate( {projectId:id},[
           { $set: 
              {"initialDate":req.body.initialDate,
                "casing.state":req.body.casing.state,
               "cementing.state":req.body.cementing.state,              
               "section.depthInProgress":
               { $add:
                     ["$section.depthInProgress", req.body.section.depthInProgress ] },
            } } ,
                 { $set: { "section.depth": { $divide: ["$section.depthInProgress","$section.finalDepth" ] }, 
                          } },
                  { $set:{
                         "sectionProgress":{ $multiply: [ "$section.depth",0.4 ] },
                      } },
                    { $set: {"StageProgress":{ $sum: [ "$sectionProgress",0 ] }  } }
                 
                    ,{ $set:{
                     "Project_Progress":{ $divide: [ "$sectionProgress",4 ] },
                  } },
                  { $set:{
                    "initialized":true,
                 } }             
                 
                 
                 ]
                    ,{new:true})
                    const stageP= await ThirdStage.findOne( {projectId:id} ) 
                    console.log(stageP.Project_Progress)  
             const projectPro= await project.findOneAndUpdate({_id:id},[
                 { $set:{
                     "thirdStagePr":stageP.Project_Progress  ,
                  } },
                  { $set:{
                    "ProjectProgress": { $sum:
                      ["$firstStagePr","$secondStagePr","$thirdStagePr" ] },
                  
                  } }        
    
                ]
                 ,{new:true}
                 )    
         if (progressedDepth == remainDepth) {
             await ThirdStage.findOneAndUpdate( {projectId:id},{$set:{
                         "section.isFinished":true
                     }} ,
                      )
                     
                    }      
                    res.status(200).json({ Stages })     
                 }
             
             
             else{
                 res.status(500).json({ msg: 'enter valid depth' })
    
                            }
            
                   }else{
                     res.status(500).json({ msg: 'It is not reasonable' })
                     
                   }
       
  }else{
    if (req.body.section.depthInProgress < stage.section.finalDepth) {
      const num2=  req.body.section.depthInProgress / stage.section.finalDepth
      const progressedDepth=num2.toFixed(2)
      
      const num= 1-stage.section.depth
     const remainDepth=num.toFixed(2)
    if (stage.section.depth<1 && progressedDepth <=	remainDepth ) {
         const Stages= await ThirdStage.findOneAndUpdate( {projectId:id},[
           { $set: 
              {"casing.state":req.body.casing.state,
               "cementing.state":req.body.cementing.state,              
               "section.depthInProgress":
               { $add:
                     ["$section.depthInProgress", req.body.section.depthInProgress ] },
            } } ,
                 { $set: { "section.depth": { $divide: ["$section.depthInProgress","$section.finalDepth" ] }, 
                          } },
                  { $set:{
                         "sectionProgress":{ $multiply: [ "$section.depth",0.4 ] },
                      } },
                    { $set: {"StageProgress":{ $sum: [ "$sectionProgress",0 ] }  } }
                 
                    ,{ $set:{
                     "Project_Progress":{ $divide: [ "$sectionProgress",4 ] },
                  } },
                 
                 
                 ]
                    ,{new:true})
                    const stageP= await ThirdStage.findOne( {projectId:id} ) 
                    console.log(stageP.Project_Progress)  
             const projectPro= await project.findOneAndUpdate({_id:id},[
                 { $set:{
                     "thirdStagePr":stageP.Project_Progress  ,
                  } },
                  { $set:{
                    "ProjectProgress": { $sum:
                      ["$firstStagePr","$secondStagePr","$thirdStagePr" ] },
                  
                  } }        
    
                ]
                 ,{new:true}
                 )    
         if (progressedDepth == remainDepth) {
             await ThirdStage.findOneAndUpdate( {projectId:id},{$set:{
                         "section.isFinished":true
                     }} ,
                      )
                     
                    }      
                    res.status(200).json({ Stages })     
                 }
             
             
             else{
                 res.status(500).json({ msg: 'enter valid depth' })
    
                            }
            
                   }else{
                     res.status(500).json({ msg: 'It is not reasonable' })
                     
                   }
    
  }
 }
else if(req.body.casing.state=="completed" &&  req.body.cementing.state =="completed" && stage.section.isFinished==true){
  
    console.log(stage.StageProgress)
      const Stages= await ThirdStage.findOneAndUpdate( {projectId:id}, [{ $set: 
          {
            "finalDate":req.body.finalDate,
             "cementing.state":req.body.cementing.state, 
                          
             } } ,
             {$set: {"StageProgress":{ $sum: [ "$StageProgress",0.3 ] }  } },
  {$set:{
      CompletedStage:true
  }
  }
  ,{ $set:{
      "Project_Progress":{ $sum: [ "$Project_Progress",(0.3/4 ) ] },
   } },
  
  
  ],{new:true})
     
  const stageP= await ThirdStage.findOne( {projectId:id} ) 
  console.log(stageP.Project_Progress)  
  const projectProgress= await project.findOneAndUpdate({_id:id},[
  { $set:{
   "thirdStagePr":stageP.Project_Progress,
  } },
  { $set:{
    "ProjectProgress": { $sum:
      ["$firstStagePr","$secondStagePr","$thirdStagePr" ] },
  
  } } ]
  ,{new:true}
  )    
  await LastStage.findOneAndUpdate({projectId:id},
    { $set:{
    "previousFinishedStage":true,
    } },
    {new:true}
    )    
  
  
  
  
           res.status(200).json({ Stages })
       
      
  
      } 
      
      
     
     else if (req.body.casing.state=="completed" && req.body.cementing.state =="pending" && stage.section.isFinished==true) {
   if (stage.StageProgress==0.7) {
      res.status(500).json({ msg: 'it is wrong' })
   
   }else{
          const Stages= await ThirdStage.findOneAndUpdate( {projectId:id}, [{ $set: 
              {"casing.state":req.body.casing.state,
                 "cementing.state":req.body.cementing.state,              
               
                          } } ,
       { $set: {"StageProgress":{ $sum: [ "$sectionProgress",0.3 ] }  } }
       ,{ $set:{
          "Project_Progress":{ $sum: [ "$Project_Progress",(0.3/4 ) ] },
       } },
    
       
       
              ],{new:true})
              const stageP= await ThirdStage.findOne( {projectId:id} ) 
              console.log(stageP.Project_Progress)  
       const projectProgress= await project.findOneAndUpdate({_id:id},[
           { $set:{
               "thirdStagePr":stageP.Project_Progress,
            } },
            { $set:{
              "ProjectProgress": { $sum:
                ["$firstStagePr","$secondStagePr","$thirdStagePr" ] },
            
            } } 
]
          ,{new:true}
           
           )    
        
               res.status(200).json({ Stages })
           
              }        
         
      }else {
          res.status(500).json({ msg: 'Something went wrong, please try again' })
      }    
   
  // const agr=await lastStage.aggregate([
  //     { $match: { projectId:idToSearch} }
  //  ,   { $project: { projectId: 1,"section.depth": { $divide: [ req.body.section.depthInProgress,"$section.finalDepth" ] } } }
  // ])
  //        res.status(200).json({  agr })
     })
     
  

   exports.updateLastStage= asyncWrapper (async(req,res)=>{    
       let id= req.params.id2
       console.log(req.params.id2)
       console.log(req)
      const stage= await LastStage.findOne( {projectId:id})
if (req.body.casing.state=="pending"  && req.body.cementing.state =="pending"	 ) {
  if (stage.initialDate==false) {
    if (req.body.section.depthInProgress < stage.section.finalDepth) {
      const num2=  req.body.section.depthInProgress / stage.section.finalDepth
      const progressedDepth=num2.toFixed(2)
      
      const num= 1-stage.section.depth
     const remainDepth=num.toFixed(2)
 
      if (stage.section.depth<1 && progressedDepth <=	remainDepth ) {
        const Stages= await LastStage.findOneAndUpdate( {projectId:id},[
          { $set: 

             {
              "initialDate":req.body.initialDate,
              "casing.state":req.body.casing.state,
              "cementing.state":req.body.cementing.state,              
              "section.depthInProgress":
              { $add:
                    ["$section.depthInProgress", req.body.section.depthInProgress ] },
           } } ,
                { $set: { "section.depth": { $divide: ["$section.depthInProgress","$section.finalDepth" ] }, 
                         } },
                 { $set:{
                        "sectionProgress":{ $multiply: [ "$section.depth",0.4 ] },
                     } },
                   { $set: {"StageProgress":{ $sum: [ "$sectionProgress",0 ] }  } }
                
                   ,{ $set:{
                    "Project_Progress":{ $divide: [ "$sectionProgress",4 ] },
                 } },
                 { $set:{
                  "initialized":true,
               } }             
               
                
                ]
                   ,{new:true})
                   const stageP= await LastStage.findOne( {projectId:id} ) 
                   console.log(stageP.Project_Progress)  
            const projectProgress= await project.findOneAndUpdate({_id:id},[
                { $set:{
                    "lastStagePr":stageP.Project_Progress,
                 } },
                 { $set:{
                  "ProjectProgress": { $sum:
                    ["$firstStagePr","$secondStagePr","$thirdStagePr","$lastStagePr" ] },
                
                } }]        
      
                ,{new:true}
                )
               
        
        if (progressedDepth ==remainDepth) {
            await LastStage.findOneAndUpdate( {projectId:id},{$set:{
                        "section.isFinished":true
                    }} ,
                     )
                    
                   }      
                   res.status(200).json({ Stages })     
                }
            
            
            else{
                res.status(500).json({ msg: 'enter valid depth' })
 
                           }
           
                  }else{
                    res.status(500).json({ msg: 'It is not reasonable' })
                    
                  } 
  }else{
    if (req.body.section.depthInProgress < stage.section.finalDepth) {
      const num2=  req.body.section.depthInProgress / stage.section.finalDepth
      const progressedDepth=num2.toFixed(2)
      
      const num= 1-stage.section.depth
     const remainDepth=num.toFixed(2)
 
      if (stage.section.depth<1 && progressedDepth <=	remainDepth ) {
        const Stages= await LastStage.findOneAndUpdate( {projectId:id},[
          { $set: 

             {
              "casing.state":req.body.casing.state,
              "cementing.state":req.body.cementing.state,              
              "section.depthInProgress":
              { $add:
                    ["$section.depthInProgress", req.body.section.depthInProgress ] },
           } } ,
                { $set: { "section.depth": { $divide: ["$section.depthInProgress","$section.finalDepth" ] }, 
                         } },
                 { $set:{
                        "sectionProgress":{ $multiply: [ "$section.depth",0.4 ] },
                     } },
                   { $set: {"StageProgress":{ $sum: [ "$sectionProgress",0 ] }  } }
                
                   ,{ $set:{
                    "Project_Progress":{ $divide: [ "$sectionProgress",4 ] },
                 } },
                
                
                ]
                   ,{new:true})
                   const stageP= await LastStage.findOne( {projectId:id} ) 
                   console.log(stageP.Project_Progress)  
            const projectProgress= await project.findOneAndUpdate({_id:id},[
                { $set:{
                    "lastStagePr":stageP.Project_Progress,
                 } },
                 { $set:{
                  "ProjectProgress": { $sum:
                    ["$firstStagePr","$secondStagePr","$thirdStagePr","$lastStagePr" ] },
                
                } }]        
      
                ,{new:true}
                )
               
        
        if (progressedDepth ==remainDepth) {
            await LastStage.findOneAndUpdate( {projectId:id},{$set:{
                        "section.isFinished":true
                    }} ,
                     )
                    
                   }      
                   res.status(200).json({ Stages })     
                }
            
            
            else{
                res.status(500).json({ msg: 'enter valid depth' })
 
                           }
           
                  }else{
                    res.status(500).json({ msg: 'It is not reasonable' })
                    
                  }
  }
   
}
else if(req.body.casing.state=="completed" &&  req.body.cementing.state =="completed" && stage.section.isFinished==true){
  
  console.log(stage.StageProgress)
    const Stages= await LastStage.findOneAndUpdate( {projectId:id}, [{ $set: 
        {
          "finalDate":req.body.finalDate,
           "cementing.state":req.body.cementing.state, 
                        
           } } ,
           {$set: {"StageProgress":{ $sum: [ "$StageProgress",0.3 ] }  } },
{$set:{
    CompletedStage:true
}
}
,{ $set:{
    "Project_Progress":{ $sum: [ "$Project_Progress",(0.3/4 ) ] },
 } },


],{new:true})
   
const stageP= await LastStage.findOne( {projectId:id} ) 
console.log(stageP.Project_Progress)  
const projectProgress= await project.findOneAndUpdate({_id:id},[
{ $set:{
 "lastStagePr":stageP.Project_Progress,
} },
{ $set:{
  "ProjectProgress": { $sum:
    ["$firstStagePr","$secondStagePr","$thirdStagePr","$lastStagePr" ] },

} }]
,{new:true}
)    




         res.status(200).json({ Stages })
     
    

    } 
    
    
   
   else if (req.body.casing.state=="completed" && req.body.cementing.state =="pending" && stage.section.isFinished==true) {
 if (stage.StageProgress==0.7) {
    res.status(500).json({ msg: 'it is wrong' })
 
 }else{
        const Stages= await LastStage.findOneAndUpdate( {projectId:id}, [{ $set: 
            {"casing.state":req.body.casing.state,
               "cementing.state":req.body.cementing.state,              
             
                        } } ,
     { $set: {"StageProgress":{ $sum: [ "$sectionProgress",0.3 ] }  } }
     ,{ $set:{
        "Project_Progress":{ $sum: [ "$Project_Progress",(0.3/4 ) ] },
     } },
  
     
     
            ],{new:true})
            const stageP= await LastStage.findOne( {projectId:id} ) 
            console.log(stageP.Project_Progress)  
     const projectProgress= await project.findOneAndUpdate({_id:id},[
         { $set:{
             "lastStagePr":stageP.Project_Progress,
          } }
          ,
{ $set:{
  "ProjectProgress": { $sum:
    ["$firstStagePr","$secondStagePr","$thirdStagePr","$lastStagePr" ] },

} }]
        ,{new:true}
         
         )    
      
             res.status(200).json({ Stages })
         
            }        
       
    }else {
        res.status(500).json({ msg: 'Something went wrong, please try again' })
    }    
 
// const agr=await lastStage.aggregate([
//     { $match: { projectId:idToSearch} }
//  ,   { $project: { projectId: 1,"section.depth": { $divide: [ req.body.section.depthInProgress,"$section.finalDepth" ] } } }
// ])
//        res.status(200).json({  agr })
   })
   
   