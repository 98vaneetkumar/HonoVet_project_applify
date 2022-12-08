var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const educationController = require("../controllers/educationController");
// const authentication = require("../middleWares/authentication").verifyToken;
const authentication =
  require("../middleWares/adminAuthentication").verifyToken;

router.post("/addEducation", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(
    educationController.addEducation,
    payload,
    req,
    res
  );
});

router.get("/getEducation",(req, res) => {
	let payload = req.body
	return sendResponse.executeMethod(educationController.getEducationAll, payload, req, res);
});

router.put("/editEducation", (req, res) => {
  let payload = req.body;

  return sendResponse.executeMethod(
    educationController.editEducation,
    payload,
    req,
    res
  );
});

router.put("/deleteEducation", (req, res) => {
    let payload = req.body;
  
    return sendResponse.executeMethod(
      educationController.editEducation,
      payload,
      req,
      res
    );
  });

module.exports = router;
