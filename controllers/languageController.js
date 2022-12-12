const _ = require("underscore");
const Service = require("../services");
const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
let config = require("../config/env")();
let commonHelper = require("../Helper/common");
const languageProjection = ["id", "language","proficiency","isDeleted"];

module.exports = {
  addlanguage: async (payloadData) => {
    const schema = Joi.object().keys({
      userId: Joi.string().guid({ version: "uuidv4" }).required(),
      language: Joi.string().optional(),
      proficiency: Joi.string().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let objToSave = {};
    if (_.has(payload, "userId") && payload.userId != "") objToSave.userId = payload.userId;
    if (_.has(payload, "language") && payload.language != "") objToSave.language = payload.language;
    if (_.has(payload, "proficiency") && payload.proficiency != "") objToSave.proficiency = payload.proficiency;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    
    let addvolunteerExperience = await Service.language.saveData(objToSave);
    if (addvolunteerExperience) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
  getlanguageAll :  async() => {
    let criteria = {
      isDeleted:0
    };
    let volunteerExperience = Service.language.getAllUsers(criteria,languageProjection);
    if (volunteerExperience) {
      return volunteerExperience;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
  editlanguage: async (payloadData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required(),
      language: Joi.string().optional(),
      proficiency: Joi.string().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let condition={
        id:payload.id,
        isBlocked:0
    }
    let objToSave = {};
 
    if (_.has(payload, "language") && payload.language != "") objToSave.language = payload.language;
    if (_.has(payload, "proficiency") && payload.proficiency != "") objToSave.proficiency = payload.proficiency;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    
    let addvolunteerExperience = await Service.language.updateData(condition,objToSave);
    if (addvolunteerExperience) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
};   
