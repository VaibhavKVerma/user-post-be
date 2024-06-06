const { Router } = require('express');
const { Success } = require('../../utils/response');
const commentService = require('../service/comment_service')();
const httpStatus = require('http-status');
const joiValidator = require('../../utils/joiValidator');
const commentValidator = require('../validator/comment_validator');

module.exports = () => {
    const router = Router();

    router.post('/:discussionId/comments', joiValidator(commentValidator.createCommentValidator), async (req, res, next) => {
        try {
            const comment = await commentService.createComment(req.body, req.params.discussionId, req.user.id);
            res.status(httpStatus.CREATED).json(Success(comment));
        } catch (error) {
            next(error);
        }
    });

    router.put('/:discussionId/comments/:id', joiValidator(commentValidator.updateCommentValidator), async (req, res, next) => {
        try {
            const comment = await commentService.updateComment(req.params.id, req.params.discussionId, req.body, req.user.id);
            res.status(httpStatus.OK).json(Success(comment));
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:discussionId/comments/:id', joiValidator(commentValidator.deleteCommentValidator), async (req, res, next) => {
        try {
            const comment = await commentService.deleteComment(req.params.id, req.params.discussionId, req.user.id);
            res.status(httpStatus.OK).json(Success(comment));
        } catch (error) {
            next(error);
        }
    });

    router.post('/:discussionId/comments/:id/like', joiValidator(commentValidator.likeCommentValidator), async (req, res, next) => {
        try {
            const comment = await commentService.likeComment(req.params.id, req.params.discussionId, req.user.id);
            res.status(httpStatus.OK).json(Success(comment));
        } catch (error) {
            next(error);
        }
    });

    router.post('/:discussionId/comments/:id/unlike', joiValidator(commentValidator.unlikeCommentValidator), async (req, res, next) => {
        try {
            const comment = await commentService.unlikeComment(req.params.id, req.params.discussionId, req.user.id);
            res.status(httpStatus.OK).json(Success(comment));
        } catch (error) {
            next(error);
        }
    });

    router.post('/:discussionId/comments/:id/reply', joiValidator(commentValidator.replyCommentValidator), async (req, res, next) => {
        try {
            const comment = await commentService.reply(req.params.id, req.params.discussionId, req.body, req.user.id);
            res.status(httpStatus.CREATED).json(Success(comment));
        } catch (error) {
            next(error);
        }
    });

    return router;
};
