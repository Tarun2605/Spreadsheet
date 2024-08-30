const Joi = require('joi');

const createSheetSchema = Joi.object({
    createdBy: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).optional(),  // Validate as MongoDB ObjectId
    updatedBy: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).optional(),  // Validate as MongoDB ObjectId
    title: Joi.string().required(),
    timeline: Joi.array().items(
        Joi.object({
            data: Joi.string().required(),
            updatedBy: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),  // Validate as MongoDB ObjectId
            updatedAt: Joi.date().default(Date.now)
        })
    ).optional(),  // Validate each timeline entry
    createdAt: Joi.date().default(Date.now),
    updatedAt: Joi.date().default(Date.now),
    workBookId: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required()  // Validate as MongoDB ObjectId
});

module.exports = createSheetSchema;
