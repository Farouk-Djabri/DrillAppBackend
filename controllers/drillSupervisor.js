const asyncWrapper=require("../middlewares/async")
const drillSupervisor=require("../models/drillSupervisor")
const project=require("../models/project")
const firstStage = require("../models/firstStage")
const SecondStage = require("../models/secondStage")
const ThirdStage = require("../models/thirdStage")
const LastStage = require("../models/lastStage")
const drillOperator = require("../models/drillOperator")
const mongoose=require("mongoose")

exports.registerDrillSpv= asyncWrapper (async(req,res)=>{
        
           res.status(200).json(await drillSupervisor.create(req.body))
})

exports.getDrillOperators= asyncWrapper (async(req,res)=>{
    
 
 res.status(200).json(await drillOperator.find({operating:false}),)
 })
 

exports.AssignDrillOperator= asyncWrapper (async(req,res)=>{
 try {
    console.log("eqsdkjl" ,req.body)
    const idS=req.params.id2
   const idP=req.params.id1
   const id_sup=req.params.id
   
   console.log(idP,idS)
   
   console.log(req.body)
const ProjectS= await project.findById(idP)
console.log(ProjectS.operatorID)

   if(req.body.operating==true){
   
    await project.findOneAndUpdate({_id:idP},{$set:{
        operatorID:idS,
         operated:true
     }},{new:true})
     await drillSupervisor.findOneAndUpdate({_id:id_sup},{$set:{
       OperatorId:idS,
         
     }},{new:true})
         
    await drillOperator.findOneAndUpdate({_id:idS},{$set:{
            projectId:idP,
            superviserId:id_sup,
            operating:true
                 }},{new:true})
          
          res.status(201).json({ msg: 'it has been assigned'})
        }
        else if(req.body.operating==false){
          console.log("it false")
               await project.findOneAndUpdate({_id:idP},{$set:{
                operatorID:new mongoose.Types.ObjectId(),
           
                 operated:false
             }},{new:true})
             await drillOperator.findOneAndUpdate({_id:idS},{$set:{
                projectId:new mongoose.Types.ObjectId(),
                superviserId:new mongoose.Types.ObjectId(),
           
                 operating:false
             }},{new:true})
             await drillSupervisor.findOneAndUpdate({_id:id_sup},{$set:{
                OperatorId:new mongoose.Types.ObjectId(),
                  
              }},{new:true})
             
            res.status(201).json({ msg: 'it has been assigned'})

 }     
else{
    console.log("it has superviser")
 }
  
 } catch (error) {
    res.status(400).send({
        message: 'this project  is already operated , you can assign one Operator !!'
     })
 }        
})

exports.generateFirstStage= asyncWrapper (async(req,res)=>{
    let id=req.params.id2
         req.body.projectId=req.params.id2
    console.log(req.body)
  
const Stages= await firstStage.create(req.body,)
await project.findOneAndUpdate({_id:id},{$set:{
    
    firstStageGn:true
         }},{new:true})
    res.status(200).json({ Stages })
})

exports.getStageOne= asyncWrapper (async(req,res)=>{
   let id=req.params.id2
console.log("ss",req.body,id)

res.status(200).json(await firstStage.findOne({projectId:id}),)

})
 exports.getStageTwo= asyncWrapper (async(req,res)=>{
    let id=req.params.id2
 console.log("ss",req.body,id)
 
 res.status(200).json(await SecondStage.findOne({projectId:id}),)
 })
 exports.getStageThree= asyncWrapper (async(req,res)=>{
    let id=req.params.id2
 console.log("ss",req.body,id)
 
 res.status(200).json(await ThirdStage.findOne({projectId:id}),)
 })
 exports.getLastStage= asyncWrapper (async(req,res)=>{
    let id=req.params.id2
 console.log("ss",req.body,id)
 
 res.status(200).json(await LastStage.findOne({projectId:id}),)
 })
   
exports.generateSecondStage= asyncWrapper (async(req,res)=>{
    let id=req.params.id2

    req.body.projectId=req.params.id2
    console.log(req.body)
    const Stages= await SecondStage.create(req.body)
    await project.findOneAndUpdate({_id:id},{$set:{
    
        secondStageGn:true
             }},{new:true})
        res.status(200).json({ Stages })
    
  })
exports.generateThirdStage= asyncWrapper (async(req,res)=>{
    let id=req.params.id2

    req.body.projectId=req.params.id2
    console.log(req.body)
    const Stages= await ThirdStage.create(req.body)
    await project.findOneAndUpdate({_id:id},{$set:{
    
        thirdStageGn:true
             }},{new:true})
        res.status(200).json({ Stages })
    
  
})

exports.generateLastStage= asyncWrapper (async(req,res)=>{
    let id=req.params.id2
    
    req.body.projectId=req.params.id2
    console.log(req.body)
    const Stages= await LastStage.create(req.body)
    await project.findOneAndUpdate({_id:id},{$set:{
    
        lastStageGn:true
             }},{new:true})
        res.status(200).json({ Stages })
    
  
})

exports.updateFirstStage= asyncWrapper (async(req,res)=>{
        
    console.log(req.body)
    let id= req.params.id2
    const Stages= await firstStage.findOneAndUpdate({projectId:id},req.body)

    res.status(200).json({ Stages })
})
exports.updateSecondStage= asyncWrapper (async(req,res)=>{
        
    console.log(req.body)
    let id= req.params.id2
    const Stages= await SecondStage.findOneAndUpdate({projectId:id},req.body)

    res.status(200).json({ Stages })
})
exports.updateThirdStage= asyncWrapper (async(req,res)=>{
        
    console.log(req.body)
    let id= req.params.id2
    const Stages= await ThirdStage.findOneAndUpdate({projectId:id},req.body)

    res.status(200).json({ Stages })
})
exports.updateLastStage= asyncWrapper (async(req,res)=>{
        
    console.log(req.body)
    let id= req.params.id2
    const Stages= await LastStage.findOneAndUpdate({projectId:id},req.body)

    res.status(200).json({ Stages })
})

exports.recieveProject= asyncWrapper (async(req,res)=>{
        let id= req.params.id
       res.status(200).json(await project.find({supervisorID:id}))
   })

   exports.getProjectForMap= asyncWrapper (async(req,res)=>{

    let id= req.params.id
   res.status(200).json(await project.findOne({supervisorID:id}))
})

exports.getOperator=asyncWrapper( async(req,res)=>{
    console.log("one Pro")
  
    let id=req.params.id2
    console.log(id)
  
res.status(200).json(await drillOperator.find({projectId:id}))


})