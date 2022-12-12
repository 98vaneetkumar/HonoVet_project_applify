var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const  MediaController = require("../controllers/projectUnderTakenMediaController");
// const authentication = require("../middleWares/authentication").verifyToken; 
const authentication = require("../middleWares/adminAuthentication").verifyToken;

router.post("/addMedia",(req, res) => {
	let payload = req.body
	return sendResponse.executeMethod(MediaController.addMedia, payload, req, res);
});

router.get("/getMedia/:id",(req, res) => {
	let payload = req.params
	return sendResponse.executeMethod(MediaController.getMediaById, payload, req, res);
});
router.get("/getMedia",(req, res) => {
	let payload = req.params
	return sendResponse.executeMethod(MediaController.getMediaAll, payload, req, res);
});

router.put("/editMedia",(req, res) => {
	let payload = req.body;
	let delet = sendResponse.executeMethod(MediaController.deleteMedia, payload, req, res);
	if(delet){
		return sendResponse.executeMethod(MediaController.addMedia, payload, req, res);
	}
	
});

router.delete("/deleteMedia",(req, res) => {
	let payload = req.body
	console.log("this is media")
    return sendResponse.executeMethod(MediaController.deleteMedia, payload, req, res);
});

module.exports = router;