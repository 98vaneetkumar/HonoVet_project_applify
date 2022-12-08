let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("language", {
		...require("./core")(Sequelize, DataTypes),
		language: {
			type: DataTypes.STRING,
			allowNull: false
		},
        proficiency: {
			type: DataTypes.STRING,
			values: appConstants.APP_CONSTANTS.PROFICIENCY_TYPE
		},
		userId: {
            type: DataTypes.UUID, allowNull:false,
            references: {
              model: "profile",
              key: "id",
            },
            onUpdate: "CASCADE",
			onDelete: "CASCADE",
          },

	}, {
		tableName: "language",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};