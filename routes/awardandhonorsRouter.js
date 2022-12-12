var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const awardController = require("../controllers/awardandhonorsController");
// const authentication = require("../middleWares/authentication").verifyToken;
const authentication =
  require("../middleWares/adminAuthentication").verifyToken;

router.post("/addawadho", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(
   awardController.addawadho,
    payload,
    req,
    res
  );
});

router.get("/getawadho",(req, res) => {
	let payload = req.body
	return sendResponse.executeMethod(awardController.getawadhoAll, payload, req, res);
});

router.put("/editawadho", (req, res) => {
  let payload = req.body;

  return sendResponse.executeMethod(
   awardController.editawadho,
    payload,
    req,
    res
  );
});

router.delete("/deleteawadho", (req, res) => {
    let payload = req.body;
  
    return sendResponse.executeMethod(
     awardController.editawadho,
      payload,
      req,
      res
    );
  });

module.exports = router;
