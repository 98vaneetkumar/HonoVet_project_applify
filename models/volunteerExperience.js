let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("volunteerExperience", {
		...require("./core")(Sequelize, DataTypes),
		organization: {
			type: DataTypes.STRING,
			allowNull: true
		},
        role: {
			type: DataTypes.STRING,
			allowNull: true
		},
        cause: {
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
		currentlyStatus:{
			type: DataTypes.TINYINT(1),
			defaultValue: 0, 
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
		tableName: "volunteerExperience",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};