var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const awardandhonorsController = require("../controllers/licenceandcertificateController");
// const authentication = require("../middleWares/authentication").verifyToken;
const authentication =
  require("../middleWares/adminAuthentication").verifyToken;

router.post("/addcertification", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(
   awardandhonorsController.addcertification,
    payload,
    req,
    res
  );
});

router.get("/getcertification",(req, res) => {
	let payload = req.body
	return sendResponse.executeMethod(awardandhonorsController.getcertificationAll, payload, req, res);
});

router.put("/editcertification", (req, res) => {
  let payload = req.body;

  return sendResponse.executeMethod(
   awardandhonorsController.editcertification,
    payload,
    req,
    res
  );
});

router.delete("/deletecertification", (req, res) => {
    let payload = req.body;
  
    return sendResponse.executeMethod(
     awardandhonorsController.editcertification,
      payload,
      req,
      res
    );
  });

module.exports = router;
