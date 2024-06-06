const { Router } = require('express');
const { Success } = require('../../utils/response');
const commentService = require('../service/comment_service')();
const httpStatus = require('http-status');

module.exports = () => {
    const router = Router();

    router.post('/:discussionId/comments', async (req, res, next) => {
        try {
            const comment = await commentService.createComment(req.body, req.params.discussionId, req.user.id);
            res.status(httpStatus.CREATED).json(Success(comment));
        } catch (error) {
            next(error);
        }
    });

    router.put('/:discussionId/comments/:id', async (req, res, next) => {
        try {
            const comment = await commentService.updateComment(req.params.id, req.params.discussionId, req.body, req.user.id);
            res.status(httpStatus.OK).json(Success(comment));
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:discussionId/comments/:id', async (req, res, next) => {
        try {
            const comment = await commentService.deleteComment(req.params.id, req.params.discussionId, req.user.id);
            res.status(httpStatus.OK).json(Success(comment));
        } catch (error) {
            next(error);
        }
    });

    router.post('/:discussionId/comments/:id/like', async (req, res, next) => {
        try {
            const comment = await commentService.likeComment(req.params.id, req.params.discussionId, req.user.id);
            res.status(httpStatus.OK).json(Success(comment));
        } catch (error) {
            next(error);
        }
    });

    router.post('/:discussionId/comments/:id/unlike', async (req, res, next) => {
        try {
            const comment = await commentService.unlikeComment(req.params.id, req.params.discussionId, req.user.id);
            res.status(httpStatus.OK).json(Success(comment));
        } catch (error) {
            next(error);
        }
    });

    router.post('/:discussionId/comments/:id/reply', async (req, res, next) => {
        try {
            const comment = await commentService.reply(req.params.id, req.params.discussionId, req.body, req.user.id);
            res.status(httpStatus.CREATED).json(Success(comment));
        } catch (error) {
            next(error);
        }
    });

    return router;
};
