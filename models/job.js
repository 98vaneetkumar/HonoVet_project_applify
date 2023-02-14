let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("job", {
		...require("./core")(Sequelize, DataTypes),
        jobId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        jobApplied:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0,
        },
        jobSave:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0,
        },
		jobName: {
			type: DataTypes.STRING,
			allowNull: false
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
		tableName: "job",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};