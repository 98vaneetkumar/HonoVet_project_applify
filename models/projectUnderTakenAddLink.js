let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("projectUndertakenAddLink", {
		...require("./core")(Sequelize, DataTypes),
		link: {
			type: DataTypes.STRING,
			allowNull: false
		},
		projectUndertakenId: {
            type: DataTypes.UUID, allowNull:false,
            references: {
              model: "projectUndertaken",
              key: "id",
            },
            onUpdate: "CASCADE",
			onDelete: "CASCADE",
          },

	}, {
		tableName: "projectUndertakenAddLink",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};