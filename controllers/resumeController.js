const _ = require("underscore");
const Service = require("../services");
// const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
// let config = require("../config/env")();
// let commonHelper = require("../Helper/common");
// const languageProjection = ["id", "language","proficiency","isDeleted"];

module.exports = {
  getresume :  async(payload) => {
    let criteria={
        id:payload.id,
        isDeleted:0
    }
    let condition={
      isDeleted:0
    }
    console.log("This is criteria",criteria)
    let resume = Service.resumeService.getAllUsers(criteria,condition);
    if (resume) {
      return resume;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },

};   
