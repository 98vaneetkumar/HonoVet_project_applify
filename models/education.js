let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("education", {
		...require("./core")(Sequelize, DataTypes),
		degree: {
			type: DataTypes.STRING,
			allowNull: false
		},
        university:{
            type: DataTypes.STRING,
			allowNull: false
        },
        from:{
            type: DataTypes.DATE,
			defaultValue: DataTypes.NOW(0),
        },
        to:{
            type: DataTypes.DATE,
			defaultValue: DataTypes.NOW(0),
        },
        score:{
            type: DataTypes.FLOAT,
        },
		userId: {
            type: DataTypes.UUID,
            allowNull:false,
            references: {
              model: "profile",
              key: "id",
            },
            onUpdate: "CASCADE",
			onDelete: "CASCADE",
          },

	}, {
		tableName: "education",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};