let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("workExperience", {
		...require("./core")(Sequelize, DataTypes),
		jobTitle: {
			type: DataTypes.STRING,
			allowNull: true
		},
        company: {
			type: DataTypes.STRING,
			allowNull: true
		},
        location: {
			type: DataTypes.STRING,
			allowNull: true
		},
        from: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW(0),
		},
        to: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW(0),
		},
        employmentType: {
			type: DataTypes.ENUM,
			values: appConstants.APP_CONSTANTS.EMPLOYMENT_TYPE
		},
        jobDescription: {
			type: DataTypes.STRING,
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
		tableName: "workExperience",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};