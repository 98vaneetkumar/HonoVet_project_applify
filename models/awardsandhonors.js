let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("awardsandhonors", {
		...require("./core")(Sequelize, DataTypes),
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
        associatedwith: {
			type: DataTypes.STRING,
			allowNull: false
		},
        issuer: {
			type: DataTypes.STRING,
			allowNull: false
		},
        issuedon: {
            type: DataTypes.DATE,
			defaultValue: DataTypes.NOW(0),
		},
        description: {
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
		tableName: "awardsandhonors",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};