let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("resume", {
		...require("./core")(Sequelize, DataTypes),
		email: {
			type: DataTypes.STRING(200),
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
		tableName: "resume",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};