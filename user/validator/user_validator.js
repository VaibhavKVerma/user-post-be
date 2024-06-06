const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const createUserValidator = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        mobile: Joi.string().required(),
        password: Joi.string().required(),
    }),
}

const searchUserValidator = {
    query: Joi.object({
        name: Joi.string().required(),
    }),
}


const getUserByIdValidator = {
    params: Joi.object({
        id: Joi.objectId().required(),
    }),
}

const updateUserByIdValidator = {
    params: Joi.object({
        id: Joi.objectId().required(),
    }),
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        mobile: Joi.string().required(),
        password: Joi.string().required(),
    }),
}

const deleteUserByIdValidator = {
    params: Joi.object({
        id: Joi.objectId().required(),
    }),
}

const followUserByIdValidator = {
    params: Joi.object({
        id: Joi.objectId().required(),
    }),
}

const unfollowUserByIdValidator = {
    params: Joi.object({
        id: Joi.objectId().required(),
    }),
}

module.exports = {
    createUserValidator,
    searchUserValidator,
    getUserByIdValidator,
    updateUserByIdValidator,
    deleteUserByIdValidator,
    followUserByIdValidator,
    unfollowUserByIdValidator
}