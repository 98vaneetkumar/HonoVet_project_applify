let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("projectUndertakenProjectMedia", {
		...require("./core")(Sequelize, DataTypes),
		media: {
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
		tableName: "projectUndertakenProjectMedia",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};