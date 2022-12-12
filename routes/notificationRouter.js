var express = require("express");
var router = express.Router();
const notificationController = require("../controllers/notificationController");
const sendResponse = require("../Helper/sendResponse");
const authentication = require("../middleWares/authentication").verifyToken;
router.get("/", (req, res) => {
	let payload = req.query;
	return sendResponse.executeMethod(notificationController.getList, payload, req, res);
});

router.get("/:id", (req, res) => {
	return sendResponse.executeMethod(notificationController.getDetail, req.params, req, res);
});

router.post("/", (req, res) => {
	return sendResponse.executeMethod(notificationController.createNotification, req.body, req, res);
});
router.put("/", (req, res) => {
	return sendResponse.executeMethod(notificationController.updateNotification, req.body, req, res);
});
router.delete("/", (req, res) => {
	let payload = req.body;
	payload.isDeleted = 1;
	return sendResponse.executeMethod(notificationController.updateNotification, payload, req, res);
});

module.exports = router;