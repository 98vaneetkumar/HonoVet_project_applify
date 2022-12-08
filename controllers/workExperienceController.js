const _ = require("underscore");
const moment = require("moment");
const Service = require("../services");
const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
let config = require("../config/env")();
let commonHelper = require("../Helper/common");
const EducationProjection = ["id","jobTitle", "company","location","from","to","employmentType","isDeleted","userId"];

module.exports = {
  addExperience: async (payloadData) => {
    const schema = Joi.object().keys({
      userId: Joi.string().guid({ version: "uuidv4" }).required(),
      jobTitle: Joi.string().optional(),
      company: Joi.string().optional(),
      location: Joi.string().optional(),
      from:Joi.string().optional(),
      to:Joi.string().optional(),
      employmentType: Joi.string().optional(),
      jobDescription: Joi.string().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let objToSave = {};
    if (_.has(payload, "userId") && payload.userId != "") objToSave.userId = payload.userId;
    if (_.has(payload, "jobTitle") && payload.jobTitle != "") objToSave.jobTitle = payload.jobTitle;
    if (_.has(payload, "company") && payload.company != "") objToSave.company = payload.company;
    if (_.has(payload, "location") && payload.location != "") objToSave.location = payload.location;
    if (_.has(payload, "from") && payload.from != "") objToSave.from = payload.from;
    if (_.has(payload, "to") && payload.to != "") objToSave.to = payload.to;
    if (_.has(payload, "employmentType") && payload.employmentType != "") objToSave.employmentType = payload.employmentType;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    if (_.has(payload, "jobDescription") && payload.jobDescription != "") objToSave.jobDescription = payload.jobDescription;
    
    let addProfile = await Service.workExperienceService.saveData(objToSave);
    if (addProfile) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
  getExperienceAll :  async(paramData) => {
    let experience = Service.workExperienceService.getAllUsers(EducationProjection);
    if (experience) {
      return experience;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
  editExperience: async (payloadData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required(),
      jobTitle: Joi.string().optional(),
      company: Joi.string().optional(),
      location: Joi.string().optional(),
      from:Joi.string().optional(),
      to:Joi.string().optional(),
      employmentType: Joi.number().optional(),
      jobDescription: Joi.number().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let condition={
        id:payload.id,
        isBlocked:0
    }
    let objToSave = {};
    if (_.has(payload, "jobTitle") && payload.jobTitle != "") objToSave.jobTitle = payload.jobTitle;
    if (_.has(payload, "company") && payload.company != "") objToSave.company = payload.company;
    if (_.has(payload, "location") && payload.location != "") objToSave.location = payload.location;
    if (_.has(payload, "from") && payload.from != "") objToSave.from = payload.from;
    if (_.has(payload, "to") && payload.to != "") objToSave.to = payload.to;
    if (_.has(payload, "employmentType") && payload.employmentType != "") objToSave.employmentType = payload.employmentType;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    if (_.has(payload, "jobDescription") && payload.jobDescription != "") objToSave.jobDescription = payload.jobDescription;
    
    let addProfile = await Service.workExperienceService.updateData(condition,objToSave);
    if (addProfile) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
};