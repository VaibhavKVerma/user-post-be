const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const createDiscussionValidator = {
    body: Joi.object({
        textField: Joi.string().required(),
        image: Joi.string(),
        hashTags: Joi.array().items(Joi.string())
    })
}

const updateDiscussionValidator = {
    params: Joi.object({
        id: Joi.objectId().required()
    }),
    body: Joi.object({
        textField: Joi.string().required(),
        image: Joi.string(),
        hashTags: Joi.array().items(Joi.string())
    })
}

const deleteDiscussionValidator = {
    params: Joi.object({
        id: Joi.objectId().required()
    })
}

const likeDiscussionValidator = {
    params: Joi.object({
        id: Joi.objectId().required()
    })
}

const unlikeDiscussionValidator = {
    params: Joi.object({
        id: Joi.objectId().required()
    })
}

const getDiscussionByIdValidator = {
    params: Joi.object({
        id: Joi.objectId().required()
    })
}

const getDiscussionsByTagValidator = {
    params: Joi.object({
        tag: Joi.string().required()
    })
}

const getDiscussionsByTextValidator = {
    params: Joi.object({
        text: Joi.string().required()
    })
}


module.exports = {
    createDiscussionValidator,
    updateDiscussionValidator,
    deleteDiscussionValidator,
    likeDiscussionValidator,
    unlikeDiscussionValidator,
    getDiscussionByIdValidator,
    getDiscussionsByTagValidator,
    getDiscussionsByTextValidator,
}