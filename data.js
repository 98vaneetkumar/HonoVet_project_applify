var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");


router.get("/get",(req, res) => {
	return 10;
});

module.exports = router;