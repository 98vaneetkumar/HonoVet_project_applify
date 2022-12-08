let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("projectUndertaken", {
		...require("./core")(Sequelize, DataTypes),
		associatedWith: {
			type: DataTypes.STRING,
			allowNull: false
		},
        projectTitle: {
			type: DataTypes.STRING,
			allowNull: false
		},
        location: {
			type: DataTypes.STRING,
			allowNull: false
		},
        date_from: {
            type: DataTypes.DATE,
			defaultValue: DataTypes.NOW(0),
		},
        date_to: {
            type: DataTypes.DATE,
			defaultValue: DataTypes.NOW(0),
		},
        currentlyOnGoing: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: 0,
		},
        projectDetails: {
			type: DataTypes.STRING,
			allowNull: false
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
		tableName: "projectUndertaken",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};