let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("certification", {
		...require("./core")(Sequelize, DataTypes),
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
        attestedby: {
			type: DataTypes.STRING,
			allowNull: false
		},
        issuedate: {
            type: DataTypes.DATE,
			defaultValue: DataTypes.NOW(0),
		},
        expirydate: {
            type: DataTypes.DATE,
			defaultValue: DataTypes.NOW(0),
            allowNull:true
		},
        certificationo: {
			type: DataTypes.STRING,
			allowNull: false
		},
        credentialURL: {
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
		tableName: "certification",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};