var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const workExperienceController = require("../controllers/workExperienceController");
// const authentication = require("../middleWares/authentication").verifyToken;
const authentication =
  require("../middleWares/adminAuthentication").verifyToken;

router.post("/addExperience", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(
    workExperienceController.addExperience,
    payload,
    req,
    res
  );
});

router.get("/getExperience",(req, res) => {
	let payload = req.body
	return sendResponse.executeMethod(workExperienceController.getExperienceAll, payload, req, res);
});

router.put("/editExperience", (req, res) => {
  let payload = req.body;

  return sendResponse.executeMethod(
    workExperienceController.editExperience,
    payload,
    req,
    res
  );
});

router.delete("/deleteExperience", (req, res) => {
    let payload = req.body;
  
    return sendResponse.executeMethod(
      workExperienceController.editExperience,
      payload,
      req,
      res
    );
  });

module.exports = router;
