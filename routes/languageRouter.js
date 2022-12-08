var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const languageController = require("../controllers/languageController");
// const authentication = require("../middleWares/authentication").verifyToken;
const authentication =
  require("../middleWares/adminAuthentication").verifyToken;

router.post("/addlanguage", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(
    languageController.addlanguage,
    payload,
    req,
    res
  );
});

router.get("/getlanguage",(req, res) => {
	let payload = req.body
	return sendResponse.executeMethod(languageController.getlanguageAll, payload, req, res);
});

router.put("/editlanguage", (req, res) => {
  let payload = req.body;

  return sendResponse.executeMethod(
    languageController.editlanguage,
    payload,
    req,
    res
  );
});

router.delete("/deletelanguage", (req, res) => {
    let payload = req.body;
  
    return sendResponse.executeMethod(
      languageController.editlanguage,
      payload,
      req,
      res
    );
  });

module.exports = router;
