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

exports.getAllUsers = (criteria,c) => {
  return new Promise((resolve, reject) => {
    Models.profile
      .findOne({   
        include: [
          { model: Models.skill , where:c},
          { model: Models.education , where:c },
          { model: Models.workExperience , where:c},
          { model: Models.volunteerExperience, where:c },
          {
            model: Models.projectUndertaken, where:c,
            include: [
              { model: Models.profileUndertakenTeamMember , where:c},
              { model: Models.projectUnderTakenAddLink, where:c },
              { model: Models.projectUndertakenProjectMedia, where:c },
            ],
          },
          { model: Models.awardsandhonor, where:c },
          { model: Models.certification , where:c},
          { model: Models.language, where:c },
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
