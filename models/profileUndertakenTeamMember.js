let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("projectUndertakenTeamMember", {
		...require("./core")(Sequelize, DataTypes),
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
        email: {
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
		tableName: "projectUndertakenTeamMember",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};