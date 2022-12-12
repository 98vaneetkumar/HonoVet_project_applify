const _ = require("underscore");
const Service = require("../services");
const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
let config = require("../config/env")();
let commonHelper = require("../Helper/common");
const certificationProjection = ["id", "title","associatedwith","issuedon","issuer","description","isDeleted","credentialURL","userId"];

module.exports = {
  addawadho: async (payloadData) => {
    const schema = Joi.object().keys({
      userId: Joi.string().guid({ version: "uuidv4" }).required(),
      title: Joi.string().optional(),
      associatedwith: Joi.string().optional(),
      issuer: Joi.string().optional(),
      issuedon:Joi.string().optional(),
      description: Joi.string().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let objToSave = {};
    if (_.has(payload, "userId") && payload.userId != "") objToSave.userId = payload.userId;
    if (_.has(payload, "title") && payload.title != "") objToSave.title = payload.title;
    if (_.has(payload, "associatedwith") && payload.associatedwith != "") objToSave.associatedwith = payload.associatedwith;
    if (_.has(payload, "issuedon") && payload.issuedon != "") objToSave.issuedon = payload.issuedon;
    if (_.has(payload, "issuer") && payload.issuer != "") objToSave.issuer = payload. issuer;
    if (_.has(payload, "description") && payload.description != "") objToSave.description = payload.description;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    
    let certification = await Service.awardandhonorsService.saveData(objToSave);
    if (certification) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
  getawadhoAll :  async() => {
    let criteria = {
      isDeleted:0
    };
    let certification = Service.awardandhonorsService.getAllUsers(criteria,certificationProjection);
    if (certification) {
      return certification;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
  editawadho: async (payloadData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required(),
      title: Joi.string().optional(),
      associatedwith: Joi.string().optional(),
      issuedon:Joi.string().optional(),
      issuer: Joi.string().optional(),
      description: Joi.string().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let condition={
        id:payload.id,
        isBlocked:0
    }
    let objToSave = {};
 
    if (_.has(payload, "title") && payload.title != "") objToSave.title = payload.title;
    if (_.has(payload, "associatedwith") && payload.associatedwith != "") objToSave.associatedwith = payload.associatedwith;
    if (_.has(payload, "issuedon") && payload.issuedon != "") objToSave.issuedon = payload.issuedon;
    if (_.has(payload, "issuer") && payload.issuer != "") objToSave.issuer = payload.issuer;
    if (_.has(payload, "description") && payload.description != "") objToSave.description = payload.description;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    
    let certification = await Service.awardandhonorsService.updateData(condition,objToSave);
    if (certification) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
};    
