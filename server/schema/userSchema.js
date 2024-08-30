const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).required(),
    role: Joi.string().optional(),
    createdAt: Joi.date().default(Date.now),
    updatedAt: Joi.date().default(Date.now)
});

module.exports = userSchema;
