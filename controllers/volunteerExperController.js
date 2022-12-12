const _ = require("underscore");
const Service = require("../services");
const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
let config = require("../config/env")();
let commonHelper = require("../Helper/common");
const VolunteerExperienceProjection = ["id", "organization","role","from","to","cause","currentlyStatus","isDeleted","userId"];

module.exports = {
  addVolExper: async (payloadData) => {
    const schema = Joi.object().keys({
      userId: Joi.string().guid({ version: "uuidv4" }).required(),
      organization: Joi.string().optional(),
      role: Joi.string().optional(),
      cause: Joi.string().optional(),
      from:Joi.string().optional(),
      to:Joi.string().optional(),
      currentlyStatus: Joi.number().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let objToSave = {};
    if (_.has(payload, "userId") && payload.userId != "") objToSave.userId = payload.userId;
    if (_.has(payload, "organization") && payload.organization != "") objToSave.organization = payload.organization;
    if (_.has(payload, "role") && payload.role != "") objToSave.role = payload.role;
    if (_.has(payload, "from") && payload.from != "") objToSave.from = payload.from;
    if (_.has(payload, "to") && payload.to != "") objToSave.to = payload.to;
    if (_.has(payload, "cause") && payload.cause != "") objToSave.cause = payload.cause;
    if (_.has(payload, "currentlyStatus") && payload.currentlyStatus != "") objToSave.currentlyStatus = payload.currentlyStatus;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    
    let addvolunteerExperience = await Service.volunteerExperService.saveData(objToSave);
    if (addvolunteerExperience) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
  getVolExperAll :  async() => {
    let criteria = {
      isDeleted:0
    };
    let volunteerExperience = Service.volunteerExperService.getAllUsers(criteria,VolunteerExperienceProjection);
    if (volunteerExperience) {
      return volunteerExperience;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
  editVolExper: async (payloadData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required(),
      organization: Joi.string().optional(),
      role: Joi.string().optional(),
      from:Joi.string().optional(),
      to:Joi.string().optional(),
      cause: Joi.string().optional(),
      currentlyStatus: Joi.number().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let condition={
        id:payload.id,
        isBlocked:0
    }
    let objToSave = {};
 
    if (_.has(payload, "organization") && payload.organization != "") objToSave.organization = payload.organization;
    if (_.has(payload, "role") && payload.role != "") objToSave.role = payload.role;
    if (_.has(payload, "from") && payload.from != "") objToSave.from = payload.from;
    if (_.has(payload, "to") && payload.to != "") objToSave.to = payload.to;
    if (_.has(payload, "cause") && payload.cause != "") objToSave.cause = payload.cause;
    if (_.has(payload, "currentlyStatus") && payload.currentlyStatus != "") objToSave.currentlyStatus = payload.currentlyStatus;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    
    let addvolunteerExperience = await Service.volunteerExperService.updateData(condition,objToSave);
    if (addvolunteerExperience) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
};   
