const _ = require("underscore");
const Service = require("../services");
const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
let config = require("../config/env")();
let commonHelper = require("../Helper/common");
const teamMemberProjection = ["id", "name","email","isDeleted"];

module.exports = {
  addteamMember: async (payloadData) => {
    const schema = Joi.object().keys({
      projectUndertakenId: Joi.string().guid({ version: "uuidv4" }).required(),
      name: Joi.string().optional(),
      email: Joi.string().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let objToSave = {};
    if (_.has(payload, "projectUndertakenId") && payload.projectUndertakenId != "") objToSave.projectUndertakenId = payload.projectUndertakenId;
    if (_.has(payload, "name") && payload.name != "") objToSave.name = payload.name;
    if (_.has(payload, "email") && payload.email != "") objToSave.email = payload.email;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    
    let addteamMember = await Service.projectUnderTakenTeamMemberService.saveData(objToSave);
    if (addteamMember) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
  getteamMemberAll :  async() => {
    let teamMember = Service.projectUnderTakenTeamMemberService.getAllUsers(teamMemberProjection);
    if (teamMember) {
      return teamMember;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
  editteamMember: async (payloadData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required(),
      name: Joi.string().optional(),
      email: Joi.string().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let condition={
        id:payload.id,
        isBlocked:0
    }
    let objToSave = {};
 
    if (_.has(payload, "name") && payload.name != "") objToSave.name = payload.name;
    if (_.has(payload, "email") && payload.email != "") objToSave.email = payload.email;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    
    let addteamMember = await Service.projectUnderTakenTeamMemberService.updateData(condition,objToSave);
    if (addteamMember) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
};   
