const Joi = require('joi');

const createWorkBookSchema = Joi.object({
    createdBy: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).optional(),
    title: Joi.string().required(),
    sheets: Joi.array().items(
        Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'))
    ).optional(),
    teamId: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).optional(),
    createdAt: Joi.date().default(Date.now),
    updatedAt: Joi.date().default(Date.now)
});

module.exports = createWorkBookSchema;
