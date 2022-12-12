var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const addlinkController = require("../controllers/addlinkController");
// const authentication = require("../middleWares/authentication").verifyToken; 
const authentication = require("../middleWares/adminAuthentication").verifyToken;

router.post("/addlink",(req, res) => {
	let payload = req.body
	return sendResponse.executeMethod(addlinkController.addLink, payload, req, res);
});

router.get("/getlink/:id",(req, res) => {
	let payload = req.params
	return sendResponse.executeMethod(addlinkController.getLinkById, payload, req, res);
});
router.get("/getlink",(req, res) => {
	let payload = req.params
	return sendResponse.executeMethod(addlinkController.getLinkAll, payload, req, res);
});

router.put("/editlink",(req, res) => {
	let payload = req.body;
	let delet = sendResponse.executeMethod(addlinkController.deletelink, payload, req, res);
	if(delet){
		return sendResponse.executeMethod(addlinkController.addLink, payload, req, res);
	}
	
});

router.delete("/deletelink",(req, res) => {
	let payload = req.body
    return sendResponse.executeMethod(addlinkController.deletelink, payload, req, res);
});

module.exports = router;