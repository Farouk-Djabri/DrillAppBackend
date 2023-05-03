const asyncWrapper=require("../middlewares/async")
const admin=require("../models/admin")
const drillSupervisor = require("../models/drillSupervisor")
const project = require("../models/project")
const mongoose=require("mongoose")

exports.registerAdmin= asyncWrapper (async(req,res)=>{
        
       console.log(req.body)
       
       res.status(200).json( await admin.create(req.body)
       )
})
   exports.formulateProject= async(req,res)=>{
    try {
        let id= req.params.id

        console.log(id)
           console.log(req.body)
           req.body.adminId=req.params.id
           res.status(200).json(  await project.create(req.body))
            
    } catch (error) {
   res.status(400).send({
    message: 'Try new Number!'
 })
    }
   
}
   
   exports.getProjects=asyncWrapper( async(req,res)=>{
    console.log("wow")
  
    let id=req.params.id
    console.log(id)
  
res.status(200).json(await project.find({adminId:id}))

})
exports.getAdmin=asyncWrapper( async(req,res)=>{
    
  
    let id=req.params.id
    console.log(id)
  
res.status(200).json(await admin.findOne({_id:id}))

})

exports.getOneProject=asyncWrapper( async(req,res)=>{
    console.log("one Pro")
  
    let id=req.params.id2
    console.log(id)
  
res.status(200).json(await project.findById(id))

})
exports.getOneDriller=asyncWrapper( async(req,res)=>{
    console.log("one Pro")
  
    let id=req.params.id2
    console.log(id)
  
res.status(200).json(await drillSupervisor.find({projectId:id}))


})

exports.UpdateProject=asyncWrapper( async(req,res)=>{
    console.log("updated")
  
    let id=req.params.id2
  
res.status(200).json(  await project.findOneAndUpdate({_id:id},req.body)
)

})
exports.getDrillSupervisor=asyncWrapper( async(req,res)=>{
    console.log("Deilll")
 const drill=await drillSupervisor.find({supervising:false})
    
 
res.status(200).json(drill)

})
exports.AssignDrillSupervisor=asyncWrapper( async(req,res)=>{
    const idS=req.params.id2
   const idP=req.params.id
   console.log(idP,idS)
   console.log(req.body.supervising)
   console.log(req.body)

   if(req.body.supervising==true){
    await project.findOneAndUpdate({_id:idP},{$set:{
        supervisorID:idS,
         supervised:true
     }},{new:true})
   
           await drillSupervisor.findOneAndUpdate({_id:idS},{$set:{
            projectId:idP,
            supervising:true
                 }},{new:true})
                 res.status(200).json({ msg: 'it has been assigned' })
    
        }
        else if(req.body.supervising==false){
          
          await project.findOneAndUpdate({_id:idP},{$set:{
            supervisorID:new mongoose.Types.ObjectId(),
             supervised:false
         }},{new:true})

             await drillSupervisor.findOneAndUpdate({_id:idS},{$set:{
        projectId:new mongoose.Types.ObjectId(),
                 supervising:false
             }},{new:true})
            res.status(201).json({ msg: 'it has been dismissed'})

 }     
else{
    console.log("it has superviser")
 }
    
})
