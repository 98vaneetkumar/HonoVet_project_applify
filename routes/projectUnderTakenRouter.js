var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const projectUnderTaken = require("../controllers/projectUnderTakenController");
// const authentication = require("../middleWares/authentication").verifyToken;
const authentication =
  require("../middleWares/adminAuthentication").verifyToken;

router.post("/addProjectUnderTaken", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(
    projectUnderTaken.addProject,
    payload,
    req,
    res
  );
});

router.get("/getProjectUnderTaken",(req, res) => {
	let payload = req.body
	return sendResponse.executeMethod(projectUnderTaken.getProjectAll, payload, req, res);
});

router.put("/editProjectUnderTaken", (req, res) => {
  let payload = req.body;

  return sendResponse.executeMethod(
    projectUnderTaken.editProject,
    payload,
    req,
    res
  );
});

router.delete("/deleteProjectUnderTaken", (req, res) => {
    let payload = req.body;
  
    return sendResponse.executeMethod(
      projectUnderTaken.editProject,
      payload,
      req,
      res
    );
  });

module.exports = router;
