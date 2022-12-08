const _ = require("underscore");
const moment = require("moment");
const Service = require("../services");
const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
let config = require("../config/env")();
let commonHelper = require("../Helper/common");
const skillProjection = ["id","skill","userId"];
module.exports = {
  addSkill: async (payloadData) => {
    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      Skill: Joi.array().items(Joi.string()).optional(),
    });
    console.log(payloadData)
    let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log(payload)
    let newSkill = [];
    if (_.has(payload, "Skill") && payload.Skill.length > 0) {
      payload.Skill.forEach((skill) => {
        newSkill.push({ userId: payload.userId, skill: skill });
      });
    }
    const result = await Service.skillService.saveData(newSkill);
    console.log("this is result", result);
    return result;
  },
  getSkillById :  async(paramData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({version: "uuidv4"}).required()
    });
    let payload = await commonHelper.verifyJoiSchema(paramData, schema);
    console.log("payload=======>1",payload);
    let criteria = {
      userId: payload.id,
      isDeleted:0
    };
    console.log("criteria=====>",criteria);
    let skill = Service.skillService.getProfile(criteria, skillProjection);
    console.log("This is skills",skill)
    if (skill) {
      return skill;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
  getSkillAll :  async(paramData) => {
    let skill = Service.skillService.getAllUsers(skillProjection);
    if (skill) {
      return skill;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
};
