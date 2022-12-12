const _ = require("underscore");
const Service = require("../services");
const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
let config = require("../config/env")();
let commonHelper = require("../Helper/common");
const projectUnderTakenProjection = ["id", "associatedWith","projectTitle","location","from","to","currentlyOnGoing","projectDetails","isDeleted"];

module.exports = {
  addProject: async (payloadData) => {
    const schema = Joi.object().keys({
      userId: Joi.string().guid({ version: "uuidv4" }).required(),
      associatedWith: Joi.string().optional(),
      projectTitle: Joi.string().optional(),
      location: Joi.string().optional(),
      from:Joi.string().optional(),
      to:Joi.string().optional(),
      currentlyOnGoing: Joi.string().optional(),
      projectDetails: Joi.string().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let objToSave = {};
    if (_.has(payload, "userId") && payload.userId != "") objToSave.userId = payload.userId;
    if (_.has(payload, "associatedWith") && payload.associatedWith != "") objToSave.associatedWith = payload.associatedWith;
    if (_.has(payload, "projectTitle") && payload.projectTitle != "") objToSave.projectTitle = payload.projectTitle;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    if (_.has(payload, "location") && payload.location != "") objToSave.location = payload.location;
    if (_.has(payload, "from") && payload.from != "") objToSave.from = payload.from;
    if (_.has(payload, "to") && payload.to != "") objToSave.to = payload.to;
    if (_.has(payload, "currentlyOnGoing") && payload.currentlyOnGoing != "") objToSave.currentlyOnGoing = payload.currentlyOnGoing;
    if (_.has(payload, "projectDetails") && payload.projectDetails != "") objToSave.projectDetails = payload.projectDetails;

    let addProjectUnderTaken = await Service.projectUnderTaken.saveData(objToSave);
    if (addProjectUnderTaken) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
  getProjectAll :  async() => {
    let volunteerExperience = Service.projectUnderTaken.getAllUsers(projectUnderTakenProjection);
    if (volunteerExperience) {
      return volunteerExperience;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
  editProject: async (payloadData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required(),
      associatedWith: Joi.string().optional(),
      projectTitle: Joi.string().optional(),
      location: Joi.string().optional(),
      from:Joi.string().optional(),
      to:Joi.string().optional(),
      currentlyOnGoing: Joi.string().optional(),
      projectDetails: Joi.string().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let condition={
        id:payload.id,
        isBlocked:0
    }
    let objToSave = {};
 
    if (_.has(payload, "associatedWith") && payload.associatedWith != "") objToSave.associatedWith = payload.associatedWith;
    if (_.has(payload, "projectTitle") && payload.projectTitle != "") objToSave.projectTitle = payload.projectTitle;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    if (_.has(payload, "location") && payload.location != "") objToSave.location = payload.location;
    if (_.has(payload, "from") && payload.from != "") objToSave.from = payload.from;
    if (_.has(payload, "to") && payload.to != "") objToSave.to = payload.to;
    if (_.has(payload, "currentlyOnGoing") && payload.currentlyOnGoing != "") objToSave.currentlyOnGoing = payload.currentlyOnGoing;
    if (_.has(payload, "projectDetails") && payload.projectDetails != "") objToSave.projectDetails = payload.projectDetails;
    let addProjectUnderTaken = await Service.projectUnderTaken.updateData(condition,objToSave);
    if (addProjectUnderTaken) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
};   
