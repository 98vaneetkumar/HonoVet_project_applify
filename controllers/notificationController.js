const Joi = require("joi");
const _ = require("underscore");
let commonHelper =  require("../Helper/common");
let config = require("../config/env")();
let Services = require("../services");
module.exports = {
	getList: async(queryData, tokenData) => {
		const schema = Joi.object().keys({
			limit: Joi.number().optional(),
			skip: Joi.number().optional(),
			sortBy: Joi.string().optional(),
			orderBy: Joi.string().optional(),
			search: Joi.string().optional().allow(""),
		});
		let payload = await commonHelper.verifyJoiSchema(queryData, schema);
		payload.receiverId = tokenData.id;
		let projection = ["id", "senderId", "receiverId", "platform", "notificationType", "title", "message", "isRead", "createdAt"];
		let list = await Services.NotificationService.listNotification(
			payload, projection, parseInt(payload.limit, 10) || config.DEFAULTS.PAGE_LIMIT, parseInt(payload.skip, 10) || 0);
		return list;
	},
	getDetail: async(queryData) => {
		try {
			const schema = Joi.object().keys({
				id: Joi.string().required(),
			});
			let payload = await commonHelper.verifyJoiSchema(queryData, schema);
			let criteria = {
				id: payload.id
			};
			let projection = ["id", "senderId", "receiverId", "platform", "notificationType", "title", "message", "isRead", "createdAt"];
			let detail = await Services.NotificationService.getNotifications(criteria, projection);
			return detail;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	createNotification: async(payloadData) => {
		try {
			const schema = Joi.object().keys({
				senderId: Joi.string().optional(),
				receiverId: Joi.string().required(),
				platform: Joi.number().optional(),
				notificationType: Joi.number().optional(),
				title: Joi.string().optional(),
				message: Joi.string().optional(),
			});
			let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
			let objToSave = {};
			if (_.has(payload, "receiverId") && payload.receiverId != "") objToSave.receiverId = payload.receiverId;
			if (_.has(payload, "senderId") && payload.senderId != "") objToSave.senderId = payload.senderId;
			if (_.has(payload, "platform")) objToSave.platform = payload.platform;
			if (_.has(payload, "notificationType")) objToSave.notificationType = payload.notificationType;
			if (_.has(payload, "title") && payload.title != "") objToSave.title = payload.title;
			if (_.has(payload, "message") && payload.message != "") objToSave.message = payload.message;
			await Services.NotificationService.saveData(objToSave);
			return {};
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	updateNotification: async(payloadData) => {
		try {
			const schema = Joi.object().keys({
				id: Joi.string().optional(),
				receiverId: Joi.string().optional(),
				platform: Joi.number().optional(),
				notificationType: Joi.number().optional(),
				title: Joi.string().optional(),
				message: Joi.string().optional(),
				isRead: Joi.number().optional(),
				isDeleted: Joi.number().optional()
			});
			let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
			let objToSave = {};
			let criteria = {};
			if (payload && payload.id) {
				criteria.id = payload.id;
			}
			if (_.has(payload, "receiverId") && payload.receiverId != "") objToSave.receiverId = payload.receiverId;
			if (_.has(payload, "senderId") && payload.senderId != "") objToSave.senderId = payload.senderId;
			if (_.has(payload, "platform")) objToSave.platform = payload.platform;
			if (_.has(payload, "notificationType")) objToSave.notificationType = payload.notificationType;
			if (_.has(payload, "title") && payload.title != "") objToSave.title = payload.title;
			if (_.has(payload, "message") && payload.message != "") objToSave.message = payload.message;
			if (_.has(payload, "isRead")) objToSave.isRead = payload.isRead;
			if (_.has(payload, "isDeleted")) objToSave.isDeleted = payload.isDeleted;

			if (payload && !payload.id && payload.receiverId) {
				criteria.receiverId = payload.receiverId;
				criteria.isRead = 0;
				delete objToSave.receiverId;
			}
			await Services.NotificationService.updateData(criteria, objToSave);
			return {};
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};