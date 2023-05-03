const express = require('express');
const router = express.Router();

const drspvCtrl=require("../controllers/drillSupervisor")
router.post("/register",drspvCtrl.registerDrillSpv) 
router.get("/:id/Dashboard/",drspvCtrl.recieveProject) 
router.get("/:id/Dashboard/ProjectMap",drspvCtrl.getProjectForMap) 

router.post("/:id/Dashboard/ProjectStages/:id2/firstStage",drspvCtrl.generateFirstStage)
router.post("/:id/Dashboard/ProjectStages/:id2/secondStage",drspvCtrl.generateSecondStage) 
router.post("/:id/Dashboard/ProjectStages/:id2/thirdStage",drspvCtrl.generateThirdStage) 
router.post("/:id/Dashboard/ProjectStages/:id2/lastStage",drspvCtrl.generateLastStage) 
router.get("/:id/Dashboard/Project/:id2/StageOne",drspvCtrl.getStageOne)
router.patch("/:id/Dashboard/Project/:id2/StageOne",drspvCtrl.updateFirstStage)
router.patch("/:id/Dashboard/Project/:id2/StageTwo",drspvCtrl.updateSecondStage)
router.patch("/:id/Dashboard/Project/:id2/StageThree",drspvCtrl.updateThirdStage)
router.patch("/:id/Dashboard/Project/:id2/StageFour",drspvCtrl.updateLastStage)
router.get("/:id/Dashboard/Project/Operators",drspvCtrl.getDrillOperators)
router.patch("/:id/Dashboard/SupervisingMonitor/:id1/:id2",drspvCtrl.AssignDrillOperator)  
router.get("/:id/Dashboard/Operator/:id2",drspvCtrl.getOperator)

router.get("/:id/Dashboard/Project/:id2/StageTwo",drspvCtrl.getStageTwo)
router.get("/:id/Dashboard/Project/:id2/StageThree",drspvCtrl.getStageThree)
router.get("/:id/Dashboard/Project/:id2/StageFour",drspvCtrl.getLastStage)

module.exports = router;