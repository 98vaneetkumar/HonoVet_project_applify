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

exports.getAllUsers = (criteria) => {
  return new Promise((resolve, reject) => {
    Models.profile
      .findOne({
        where: criteria,
        include: [
          {
            model: Models.skill,
          },
          { model: Models.education },
          { model: Models.workExperience },
          { model: Models.volunteerExperience },
          {
            model: Models.projectUndertaken,
            include: [
              { model: Models.profileUndertakenTeamMember },
              { model: Models.projectUnderTakenAddLink },
              { model: Models.projectUndertakenProjectMedia },
            ],
          },
          { model: Models.awardsandhonor },
          { model: Models.certification },
          { model: Models.language },
        ],
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
