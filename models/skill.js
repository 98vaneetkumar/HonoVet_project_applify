let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("skill", {
		...require("./core")(Sequelize, DataTypes),
		skill: {
			type: DataTypes.STRING,
			allowNull: true
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
		tableName: "skill",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};