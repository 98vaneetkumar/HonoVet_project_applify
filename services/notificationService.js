"use strict";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Models = require("../models");
const Response = require("../config/response");
const baseService = require("./base");

exports.saveData = async (objToSave) => {
	return await baseService.saveData(Models.Notifications, objToSave);
};
exports.updateData = async (criteria, objToSave,) => {
	return await baseService.updateData(Models.Notifications, criteria, objToSave);
};
exports.count = async (criteria) => {
	let where = {};
	if (criteria && criteria.search) {
		where = {
			title: {
				[Op.like]: "%" + criteria.search + "%"
			}
		};
	}
	
	return await baseService.count(Models.Notifications, where);
};
exports.getNotifications =async (criteria, projection) => {
	return await baseService.getSingleRecord(	Models.Notifications, criteria, projection);

	
};
exports.listNotification = (criteria, projection, limit, offset) => {
	return new Promise((resolve, reject) => {
		console.log(criteria, "??????");
		let where = {};
		let order = [
			["createdAt", "DESC"]
		];
		if (criteria.sortBy && criteria.orderBy) {
			order = [
				[criteria.sortBy, criteria.orderBy]
			];
		}
		if (criteria && criteria.search) {
			where = {
				title: {
					[Op.like]: "%" + criteria.search + "%"
				}
			};
		}
		if(criteria && criteria.receiverId) {
			where.receiverId = criteria.receiverId;
		}
		where.isDeleted = 0;
		Models
			.Notifications
			.findAndCountAll({
				limit,
				offset,
				where: where,
				attributes: projection,
				order: order,
			}).then(result => {
				resolve(result);
			}).catch((err) => {
				console.log(err);
				reject(Response.error_msg.implementationError);
			});
	});
};

exports.get_weekly_tasks = (criteria,projection,tasks) => {
    let start = moment().startOf(tasks).toDate();
    start = start.setHours(0, 0, 0, 0);
    let end = moment().endOf(tasks).toDate();
    end = end.setHours(23, 59, 59, 999);
  
    let where = {};
  
    if ("startDate" in criteria && "endDate" in criteria) {
      where[Op.and] = [
        { createdAt: { [Op.gt]: criteria.startDate } },
        { createdAt: { [Op.lte]: criteria.endDate } },
      ];
    }
  
    where = {
      [Op.and]: [
        {
          [Op.or]: {
            id: {
              [Op.in]: [
                Sequelize.literal(
                  `(Select id from Notifications where userId = '${criteria.userId}')`
                ),
              ],
            },
            assignedBy: {
              [Op.eq]: criteria.userId,
            },
          },
  
          updatedAt: {
            [Op.between]: [start, end],
          },
          taskStatus: 1,
          isDeleted: 0,
        },
      ],
    };
    console.log(where, "PP");
    return new Promise((resolve, reject) => {
      Models.Notifications.findAndCountAll({
        attributes: projection,
        where: where,
        group: [Sequelize.fn("dayofweek", Sequelize.col("updatedAt"))],
      })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log("count err ==>>  ", err);
          reject(Response.error_msg.implementationError);
        });
    });
  };
  