const express = require('express');
const router = express.Router();

const droptCtrl=require("../controllers/drillOperator")
router.post("/register",droptCtrl.registerDrillOpt) 
router.get("/:id/Dashboard/",droptCtrl.recieveProject) 
router.patch("/:id/Dashboard/Project/:id2/StageOne",droptCtrl.updateFirstStage)
router.patch("/:id/Dashboard/Project/:id2/StageTwo",droptCtrl.updateSecondStage)
router.patch("/:id/Dashboard/Project/:id2/StageThree",droptCtrl.updateThirdStage)
router.patch("/:id/Dashboard/Project/:id2/StageFour",droptCtrl.updateLastStage)
router.get("/:id/drillSupervisor",droptCtrl.getSupervisor)

module.exports = router;