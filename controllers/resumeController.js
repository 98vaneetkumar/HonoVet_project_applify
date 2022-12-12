const _ = require("underscore");
const Service = require("../services");
const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
let config = require("../config/env")();
let commonHelper = require("../Helper/common");
// const languageProjection = ["id", "language","proficiency","isDeleted"];

module.exports = {
  getresume :  async(payload) => {
    let criteria={
        id:payload.id
    }
    let volunteerExperience = Service.resumeService.getAllUsers(criteria);
    if (volunteerExperience) {
      return volunteerExperience;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },

};   
