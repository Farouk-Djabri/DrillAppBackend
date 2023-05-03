const asyncWrapper=require("../middlewares/async")
const supAdmin=require("../models/SupAdmin")
const admin = require("../models/admin")

exports.registerSupAdmin= asyncWrapper (async(req,res)=>{
        
    console.log(req.body)
    
    res.status(200).json( await supAdmin.create(req.body)
    )
})

exports.getAdmins= asyncWrapper (async(req,res)=>{
        
    console.log(req.body)
    
    res.status(200).json( await admin.find({})
    )
})
exports.Authorize=asyncWrapper( async(req,res)=>{
    const idS=req.params.id
 
   console.log(idS)
   console.log(req.body.adminstration)
   console.log(req.body)

   if(req.body.adminstration==true){
    await admin.findOneAndUpdate({_id:idS},{$set:{
    adminstration:true    
    }},{new:true})
   
                 res.status(200).json({ msg: 'it has been assigned' })
    
        }
        else if(req.body.adminstration==false){
          
          await admin.findOneAndUpdate({_id:idS},{$set:{
            adminstration:false
        }},{new:true})

            res.status(201).json({ msg: 'it has been dismissed'})

 }
    
})
