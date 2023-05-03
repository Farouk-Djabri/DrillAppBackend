const express = require('express');
const admin=require("../models/admin")
const router = express.Router();
const adminCtrl=require("../controllers/admin")

router.post("/register",adminCtrl.registerAdmin)
router.post("/:id/NewProject",adminCtrl.formulateProject)  
router.get("/:id/Dashboard/",adminCtrl.getProjects)  
router.get("/:id/",adminCtrl.getAdmin)  

router.patch("/:id/Dashboard/Project/:id2",adminCtrl.UpdateProject)  
router.get("/:id/Dashboard/Project/:id2",adminCtrl.getOneProject)  
router.get("/:id/Dashboard/Driller/:id2",adminCtrl.getOneDriller)  

router.get("/Dashboard/SupervisingMonitor",adminCtrl.getDrillSupervisor)  
router.patch("/Dashboard/SupervisingMonitor/:id/:id2",adminCtrl.AssignDrillSupervisor)  

module.exports = router;