const Joi = require('joi');
const mongoose = require('mongoose');

const createTeamSchema = Joi.object({
    name: Joi.string().required(),
    members: Joi.array().items(
        Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'))
    ).optional(),
    createdAt: Joi.date().default(Date.now),
    updatedAt: Joi.date().default(Date.now)
});

module.exports = createTeamSchema;
