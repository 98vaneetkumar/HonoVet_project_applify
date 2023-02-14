const _ = require("underscore");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Models = require("../models");
const Response = require("../config/response");
const baseService = require("./base");

Models.profile.hasMany(Models.skill, { foreignKey: "userId" });
Models.profile.hasMany(Models.education, { foreignKey: "userId" });
Models.profile.hasMany(Models.workExperience, { foreignKey: "userId" });
Models.profile.hasMany(Models.volunteerExperience, { foreignKey: "userId" });
Models.profile.hasMany(Models.projectUndertaken, { foreignKey: "userId" });
Models.projectUndertaken.hasMany(Models.profileUndertakenTeamMember, {
  foreignKey: "projectUndertakenId",
});
Models.projectUndertaken.hasMany(Models.projectUnderTakenAddLink, {
  foreignKey: "projectUndertakenId",
});
Models.projectUndertaken.hasMany(Models.projectUndertakenProjectMedia, {
  foreignKey: "projectUndertakenId",
});
Models.profile.hasMany(Models.awardsandhonor, { foreignKey: "userId" });
Models.profile.hasMany(Models.certification, { foreignKey: "userId" });
Models.profile.hasMany(Models.language, { foreignKey: "userId" });

exports.getAllUsers = (criteria,condition) => {
  return new Promise((resolve, reject) => {
    Models.profile
      .findOne({   
        include: [
          { model: Models.skill , where:condition,required:false},
          { model: Models.education , where:condition,required:false },
          { model: Models.workExperience , where:condition,required:false},
          { model: Models.volunteerExperience, where:condition,required:false },
          {
            model: Models.projectUndertaken, where:condition,required:false,
            include: [
              { model: Models.profileUndertakenTeamMember , where:condition,required:false},
              { model: Models.projectUnderTakenAddLink, where:condition,required:false },
              { model: Models.projectUndertakenProjectMedia, where:condition,required:false },
            ],
          },
          { model: Models.awardsandhonor, where:condition,required:false },
          { model: Models.certification , where:condition,required:false},
          { model: Models.language, where:condition ,required:false},
        ],
        where: criteria,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log("getAll err ==>>  ", err);
        reject(Response.error_msg.implementationError);
      });
  });
};
