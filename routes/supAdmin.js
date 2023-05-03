const express = require('express');
const router = express.Router();
const supAdminCtrl=require("../controllers/supAdmin")

router.post("/register",supAdminCtrl.registerSupAdmin)
router.get("/Dashboard/",supAdminCtrl.getAdmins)  
router.patch("/Dashboard/:id/authorization",supAdminCtrl.Authorize)  


module.exports = router;