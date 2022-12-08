const _ = require("underscore");
const Service = require("../services");
const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
let config = require("../config/env")();
let commonHelper = require("../Helper/common");
const certificationProjection = ["id", "name","attestedby","expirydate","issuedate","certificationo","isDeleted","credentialURL","userId"];

module.exports = {
  addcertification: async (payloadData) => {
    const schema = Joi.object().keys({
      userId: Joi.string().guid({ version: "uuidv4" }).required(),
      name: Joi.string().optional(),
      attestedby: Joi.string().optional(),
      issuedate: Joi.string().optional(),
      expirydate:Joi.string().optional(),
      certificationo: Joi.string().optional(),
      credentialURL:Joi.string().optional(),
      isDeleted:Joi.number().valid(0,1).optional()
    });
 
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let objToSave = {};
    if (_.has(payload, "userId") && payload.userId != "") objToSave.userId = payload.userId;
    if (_.has(payload, "name") && payload.name != "") objToSave.name = payload.name;
    if (_.has(payload, "attestedby") && payload.attestedby != "") objToSave.attestedby = payload.attestedby;
    if (_.has(payload, "expirydate") && payload.expirydate != "") objToSave.expirydate = payload.expirydate;
    if (_.has(payload, "issuedate") && payload.issuedate != "") objToSave.issuedate = payload. issuedate;
    if (_.has(payload, "credentialURL") && payload.credentialURL != "") objToSave.credentialURL = payload.credentialURL;
    if (_.has(payload, "certificationo") && payload.certificationo != "") objToSave.certificationo = payload.certificationo;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    
    let certification = await Service.liecenceandcertificateService.saveData(objToSave);
    if (certification) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
  getcertificationAll :  async() => {
    let certification = Service.liecenceandcertificateService.getAllUsers(certificationProjection);
    if (certification) {
      return certification;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
  editcertification: async (payloadData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required(),
      name: Joi.string().optional(),
      attestedby: Joi.string().optional(),
      expirydate:Joi.string().optional(),
      issuedate: Joi.string().optional(),
      certificationo: Joi.string().optional(),
      credentialURL:Joi.string().optional(),
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
    if (_.has(payload, "attestedby") && payload.attestedby != "") objToSave.attestedby = payload.attestedby;
    if (_.has(payload, "expirydate") && payload.expirydate != "") objToSave.expirydate = payload.expirydate;
    if (_.has(payload, "issuedate") && payload.issuedate != "") objToSave.issuedate = payload.issuedate;
    if (_.has(payload, "credentialURL") && payload.credentialURL != "") objToSave.credentialURL = payload.credentialURL;
    if (_.has(payload, "certificationo") && payload.certificationo != "") objToSave.certificationo = payload.certificationo;
    if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    
    let certification = await Service.liecenceandcertificateService.updateData(condition,objToSave);
    if (certification) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },
};   
