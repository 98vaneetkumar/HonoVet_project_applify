const _ = require("underscore");
const moment = require("moment");
const Service = require("../services");
const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
let config = require("../config/env")();
let commonHelper = require("../Helper/common");
const linkProjection = ["id","link","projectUndertakenId"];
module.exports = {
  addLink: async (payloadData) => {
    const schema = Joi.object().keys({
      projectUndertakenId: Joi.string().required(),
      Link: Joi.array().items(Joi.string()).optional(),
    });
    console.log("This is payload data",payloadData)
    let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log(payload)
    let newLink = [];
    if (_.has(payload, "Link") && payload.Link.length > 0) {
      payload.Link.forEach((link) => {
        newLink.push({ projectUndertakenId: payload.projectUndertakenId, link: link });
      });
    }
    console.log("this is a new link",newLink)
    const result = await Service.addlinkService.saveData(newLink);
    console.log("this is result", result);
    return result;
  },
  getLinkById :  async(paramData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({version: "uuidv4"}).required()
    });
    let payload = await commonHelper.verifyJoiSchema(paramData, schema);
    console.log("payload=======>1",payload);
    let criteria = {
      id: payload.id,
      isDeleted:0
    };
    console.log("criteria=====>",criteria);
    let skill = Service.addlinkService.getProfile(criteria, skillProjection);
    console.log("This is skills",skill)
    if (skill) {
      return skill;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
  getLinkAll :  async(paramData) => {
    let link = Service.addlinkService.getAllUsers(linkProjection);
    if (link) {
      return link;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
  editlink: async (payloadData) => {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
      Link: Joi.array().items(Joi.string()).optional(),
    });
    console.log(payloadData)
    let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log(payload)
    let newLink = [];
    if (_.has(payload, "Link") && payload.Link.length > 0) {
      payload.Link.forEach((link) => {
        newLink.push({ id: payload.id, link: link });
      });
    }
    const result = await Service.addlinkService.updateData(newSkill);
    console.log("this is result", result);
    return result;
  },
  deletelink: async (payloadData) => {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
    //   isDeleted:Joi.number().required()
    //   Link: Joi.array().items(Joi.string()).optional(),
    });
    console.log(payloadData)
    let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log(payload)
    let objToSave={}
    if (_.has(payload, "id") && payload.id != "") objToSave.id = payload.id;
    // if (_.has(payload, "isDeleted") && payload.isDeleted != "") objToSave.isDeleted = payload.isDeleted;
    const result = await Service.addlinkService.delete(objToSave);
    console.log("this is result", result);
    return result;
  },
  addLinkUsingObject: async (payloadData) => {
    const schema = Joi.object().keys({
      projectUndertakenId: Joi.string().required(),
      // Link: Joi.array().items(Joi.string()).optional(),
      addLink:Joi.array.items({
        module:Joi.string().required,
        value:Joi.string().required()
      }).optional()
    });
    console.log(payloadData)
    let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log(payload)
    let newLink = {};
    if (_.has(payload, "Link") && payload.Link.length > 0) {
      payload.Link.forEach((link) => {
        // newLink.push({ projectUndertakenId: payload.projectUndertakenId, link: link });
        newLink[link.module]=link.value
      });
    }
    console.log(newLink)
    // const result = await Service.addlinkService.saveData(newSkill);
    // console.log("this is result", result);
    // return result;
  },
};
