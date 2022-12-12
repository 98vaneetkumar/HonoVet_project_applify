var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const resumeController = require("../controllers/resumeController");
// const authentication = require("../middleWares/authentication").verifyToken;
const authentication =
  require("../middleWares/adminAuthentication").verifyToken;


router.get("/get/:id",(req, res) => {
	let payload = req.params
	return sendResponse.executeMethod(resumeController.getresume, payload, req, res);
});



module.exports = router;
