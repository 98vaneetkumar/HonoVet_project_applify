const _ = require("underscore");
const moment = require("moment");
const Service = require("../services");
const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
let config = require("../config/env")();
let commonHelper = require("../Helper/common");
const MediaProjection = ["id", "media", "projectUndertakenId", "isDeleted"];
module.exports = {
  addMedia: async (payloadData) => {
    const schema = Joi.object().keys({
      projectUndertakenId: Joi.string().required(),
      Media: Joi.array().items(Joi.string()).optional(),
    });
    console.log("This is payload data", payloadData);
    let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log(payload);
    let newMedia = [];
    if (_.has(payload, "Media") && payload.Media.length > 0) {
      payload.Media.forEach((media) => {
        newMedia.push({
          projectUndertakenId: payload.projectUndertakenId,
          media: media,
        });
      });
    }
    console.log("this is a new link", newMedia);
    const result = await Service.projectUnderTakenMediaService.saveData(
      newMedia
    );
    console.log("this is result", result);
    return result;
  },
  getMediaById: async (paramData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required(),
    });
    let payload = await commonHelper.verifyJoiSchema(paramData, schema);
    console.log("payload=======>1", payload);
    let criteria = {
      id: payload.id,
      isDeleted: 0,
    };
    console.log("criteria=====>", criteria);
    let skill = Service.projectUnderTakenMediaService.getProfile(
      criteria,
      MediaProjection
    );
    console.log("This is skills", skill);
    if (skill) {
      return skill;
    } else {
      throw Response.error_msg.recordNotFound;
    }
  },
  getMediaAll: async (paramData) => {
    let Media =
      Service.projectUnderTakenMediaService.getAllUsers(MediaProjection);
    if (Media) {
      return Media;
    } else {
      throw Response.error_msg.recordNotFound;
    }
  },
  editMedia: async (payloadData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required(),
      Media: Joi.array().items(Joi.string()).optional(),
    });
    console.log(payloadData);
    let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log(payload);
    let newMedia = [];
    if (_.has(payload, "Media") && payload.Media.length > 0) {
      payload.Media.forEach((media) => {
        newMedia.push({ id: payload.id, media: media });
      });
    }
    const result = await Service.projectUnderTakenMediaService.updateData(
      newSkill
    );
    console.log("this is result", result);
    return result;
  },
  deleteMedia: async (payloadData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }),  
      isDeleted: Joi.number().valid(0, 1),
    });
    console.log("this is payloaddata", payloadData.id);
    let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("this is payload", payload);
    let criteria = {
      id: payload.id,
    };
    console.log("this is criteria",criteria.id)
    let objToSave = {};
    if (_.has(payload, "isDeleted") && payload.isDeleted != "")
      objToSave.isDeleted = payload.isDeleted;
    console.log("ojecttosave", objToSave);
    const result = await Service.projectUnderTakenMediaService.updateData(
      criteria,
      objToSave
    );
    console.log("this is result", result);
    return result;
  },
  addLinkUsingObject: async (payloadData) => {
    const schema = Joi.object().keys({
      projectUndertakenId: Joi.string().required(),
      // Link: Joi.array().items(Joi.string()).optional(),
      addLink: Joi.array
        .items({
          module: Joi.string().required,
          value: Joi.string().required(),
        })
        .optional(),
    });
    console.log(payloadData);
    let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log(payload);
    let newLink = {};
    if (_.has(payload, "Link") && payload.Link.length > 0) {
      payload.Link.forEach((link) => {
        // newLink.push({ projectUndertakenId: payload.projectUndertakenId, link: link });
        newLink[link.module] = link.value;
      });
    }
    console.log(newLink);
    // const result = await Service.projectUnderTakenMediaService.saveData(newSkill);
    // console.log("this is result", result);
    // return result;
  },
};
