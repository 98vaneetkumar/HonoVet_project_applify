const _ = require("underscore");
const moment = require("moment");
const Service = require("../services");
const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
let config = require("../config/env")();
let commonHelper = require("../Helper/common");
let NotificationManager = require("../Helper/mailer");
let TokenManager = require("../Helper/adminTokenManager");
const privateKey = config.APP_URLS.PRIVATE_KEY_ADMIN;
const path = require("path");
const EducationProjection = ["id", "degree","university","from","to","score","isDeleted","userId"];
const Sequelize = require("sequelize");


module.exports = {
  addEducation: async (payloadData) => {
    const schema = Joi.object().keys({
      userId: Joi.string().guid({ version: "uuidv4" }).required(),
      degree: Joi.string().optional(),
      university: Joi.string().optional(),
      from:Joi.string().optional(),
      to:Joi.string().optional(),
      score: Joi.number().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let objToSave = {};
    if (_.has(payload, "userId") && payload.userId != "") objToSave.userId = payload.userId;
    if (_.has(payload, "degree") && payload.degree != "") objToSave.degree = payload.degree;
    if (_.has(payload, "university") && payload.university != "") objToSave.university = payload.university;
    if (_.has(payload, "from") && payload.from != "") objToSave.from = payload.from;
    if (_.has(payload, "to") && payload.to != "") objToSave.to = payload.to;
    if (_.has(payload, "score") && payload.score != "") objToSave.score = payload.score;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    
    let addProfile = await Service.educationService.saveData(objToSave);
    if (addProfile) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
  getEducationAll :  async(paramData) => {
    let criteria = {
      isDeleted:0
    };
    let education = Service.educationService.getAllUsers(criteria,EducationProjection);
    if (education) {
      return education;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
  editEducation: async (payloadData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required(),
      degree: Joi.string().optional(),
      university: Joi.string().optional(),
      from:Joi.string().optional(),
      to:Joi.string().optional(),
      score: Joi.number().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let condition={
        id:payload.id,
        isBlocked:0
    }
    let objToSave = {};
 
    if (_.has(payload, "degree") && payload.degree != "") objToSave.degree = payload.degree;
    if (_.has(payload, "university") && payload.university != "") objToSave.university = payload.university;
    if (_.has(payload, "from") && payload.from != "") objToSave.from = payload.from;
    if (_.has(payload, "to") && payload.to != "") objToSave.to = payload.to;
    if (_.has(payload, "score") && payload.score != "") objToSave.score = payload.score;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    
    let addProfile = await Service.educationService.updateData(condition,objToSave);
    if (addProfile) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
};