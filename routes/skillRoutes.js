var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const skillController = require("../controllers/skillController");
// const authentication = require("../middleWares/authentication").verifyToken; 
const authentication = require("../middleWares/adminAuthentication").verifyToken;

router.post("/addSkill",(req, res) => {
	let payload = req.body
	return sendResponse.executeMethod(skillController.addSkill, payload, req, res);
});

router.get("/getSkill/:id",(req, res) => {
	let payload = req.params
	return sendResponse.executeMethod(skillController.getSkillById, payload, req, res);
});
router.get("/getSkill",(req, res) => {
	let payload = req.params
	return sendResponse.executeMethod(skillController.getSkillAll, payload, req, res);
});

// router.put("/editSkill",(req, res) => {
// 	let payload = req.body
// 	const edit= sendResponse.executeMethod(skillController.deleteSkill,payload,req,res)
// 	if(edit){
// 		return sendResponse.executeMethod(skillController.addSkill, payload, req, res);
// 	}
// 	else{
// 		return {
// 			msg:"Enable to edit"
// 		}
// 	}
// });


module.exports = router;