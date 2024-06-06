const Joi = require("joi");

const loginValidator = {
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
}

const signupValidator = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        mobile: Joi.string().required(),
        password: Joi.string().required(),
    })
}

module.exports = {
    loginValidator,
    signupValidator,
}