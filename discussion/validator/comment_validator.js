const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const createCommentValidator = {
    params: Joi.object({
        discussionId: Joi.objectId().required(),
    }),
    body: Joi.object({
        description: Joi.string().required(),
    }),
}

const updateCommentValidator = {
    params: Joi.object({
        discussionId: Joi.objectId().required(),
        id: Joi.objectId().required(),
    }),
    body: Joi.object({
        description: Joi.string().required(),
    }),
}

const deleteCommentValidator = {
    params: Joi.object({
        discussionId: Joi.objectId().required(),
        id: Joi.objectId().required(),
    }),
}

const likeCommentValidator = {
    params: Joi.object({
        discussionId: Joi.objectId().required(),
        id: Joi.objectId().required(),
    }),
}

const unlikeCommentValidator = {
    params: Joi.object({
        discussionId: Joi.objectId().required(),
        id: Joi.objectId().required(),
    }),
}

const replyCommentValidator = {
    params: Joi.object({
        discussionId: Joi.objectId().required(),
        id: Joi.objectId().required(),
    }),
    body: Joi.object({
        text: Joi.string().required(),
    }),
}

module.exports = {
    createCommentValidator,
    updateCommentValidator,
    deleteCommentValidator,
    likeCommentValidator,
    unlikeCommentValidator,
    replyCommentValidator,
}