var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const TeamMemberController = require("../controllers/projectUnderTakenTeamMemberController");
// const authentication = require("../middleWares/authentication").verifyToken;
const authentication =
  require("../middleWares/adminAuthentication").verifyToken;

router.post("/addteamMember", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(
    TeamMemberController.addteamMember,
    payload,
    req,
    res
  );
});

router.get("/getteamMember",(req, res) => {
	let payload = req.body
	return sendResponse.executeMethod(TeamMemberController.getteamMemberAll, payload, req, res);
});

router.put("/editteamMember", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(
    TeamMemberController.editteamMember,
    payload,
    req,
    res
  );
});

router.delete("/deleteteamMember", (req, res) => {
    let payload = req.body;
  
    return sendResponse.executeMethod(
      TeamMemberController.editteamMember,
      payload,
      req,
      res
    );
  });

module.exports = router;
