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