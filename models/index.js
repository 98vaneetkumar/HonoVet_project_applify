var Sequelize = require("sequelize");
var sequelize = require("../dbConnection").sequelize;
module.exports = {
  profile: require("./profile")(Sequelize, sequelize, Sequelize.DataTypes),
  awardsandhonor: require("./awardsandhonors")(Sequelize, sequelize, Sequelize.DataTypes),
  certification: require("./certification")(Sequelize, sequelize, Sequelize.DataTypes),
  education: require("./education")(Sequelize, sequelize, Sequelize.DataTypes),
  language: require("./language")(Sequelize, sequelize, Sequelize.DataTypes),
  profileUndertakenTeamMember: require("./profileUndertakenTeamMember")(Sequelize, sequelize, Sequelize.DataTypes),
  projectUnderTakenAddLink: require("./projectUnderTakenAddLink")(Sequelize, sequelize, Sequelize.DataTypes),
  projectUndertaken: require("./projectUndertaken")(Sequelize, sequelize, Sequelize.DataTypes),
  projectUndertakenProjectMedia: require("./projectUndertakenProjectMedia")(Sequelize, sequelize, Sequelize.DataTypes),
  resume: require("./resume")(Sequelize, sequelize, Sequelize.DataTypes),
  skill: require("./skill")(Sequelize, sequelize, Sequelize.DataTypes),
  volunteerExperience: require("./volunteerExperience")(Sequelize, sequelize, Sequelize.DataTypes),
  workExperience: require("./work_experience")(Sequelize, sequelize, Sequelize.DataTypes),
  Notifications: require("./notificationModel")(Sequelize, sequelize, Sequelize.DataTypes),
};