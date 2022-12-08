var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const volunteerExperController = require("../controllers/volunteerExperController");
// const authentication = require("../middleWares/authentication").verifyToken;
const authentication =
  require("../middleWares/adminAuthentication").verifyToken;

router.post("/addVolExper", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(
    volunteerExperController.addVolExper,
    payload,
    req,
    res
  );
});

router.get("/getVolExper",(req, res) => {
	let payload = req.body
	return sendResponse.executeMethod(volunteerExperController.getVolExperAll, payload, req, res);
});

router.put("/editVolExper", (req, res) => {
  let payload = req.body;

  return sendResponse.executeMethod(
    volunteerExperController.editVolExper,
    payload,
    req,
    res
  );
});

router.delete("/deleteVolExper", (req, res) => {
    let payload = req.body;
  
    return sendResponse.executeMethod(
      volunteerExperController.editVolExper,
      payload,
      req,
      res
    );
  });

module.exports = router;
