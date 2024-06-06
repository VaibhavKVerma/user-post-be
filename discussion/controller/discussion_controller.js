const { Router } = require('express');
const httpStatus = require('http-status');
const { Success } = require('../../utils/response');
const joiValidator = require('../../utils/joiValidator');
const discussionValidator = require('../validator/discussion_validator');
const discussionService = require('../service/discussion_service')();

module.exports = () => {
    const router = Router();

    router.post('/', joiValidator(discussionValidator.createDiscussionValidator), async (req, res, next) => {
        try {
            const discussion = await discussionService.createDiscussion(req.body, req.user.id);
            res.status(httpStatus.CREATED).json(Success(discussion));
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id', joiValidator(discussionValidator.updateDiscussionValidator), async (req, res, next) => {
        try {
            const discussion = await discussionService.updateDiscussion(req.params.id, req.body, req.user.id);
            res.status(httpStatus.OK).json(Success(discussion));
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:id', joiValidator(discussionValidator.deleteDiscussionValidator), async (req, res, next) => {
        try {
            const discussion = await discussionService.deleteDiscussion(req.params.id, req.user.id);
            res.status(httpStatus.OK).json(Success(discussion));
        } catch (error) {
            next(error);
        }
    });

    router.get('/tag', joiValidator(discussionValidator.getDiscussionsByTagValidator), async (req, res, next) => {
        try {
            const discussions = await discussionService.getDiscussionsByTag(req.query.tag);
            res.status(httpStatus.OK).json(Success(discussions));
        } catch (error) {
            next(error);
        }
    });

    router.get('/search', joiValidator(discussionValidator.getDiscussionsByTextValidator), async (req, res, next) => {
        try {
            const discussions = await discussionService.getDiscussionsByText(req.query.text);
            res.status(httpStatus.OK).json(Success(discussions));
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', joiValidator(discussionValidator.getDiscussionByIdValidator), async (req, res, next) => {
        try {
            const discussions = await discussionService.getDiscussionById(req.params.id, true);
            res.status(httpStatus.OK).json(Success(discussions));
        } catch (error) {
            next(error);
        }
    });

    router.post('/:id/like', joiValidator(discussionValidator.likeDiscussionValidator), async (req, res, next) => {
        try {
            const discussion = await discussionService.likeDiscussion(req.params.id, req.user.id);
            res.status(httpStatus.OK).json(Success(discussion));
        } catch (error) {
            next(error);
        }
    });

    router.post('/:id/unlike', joiValidator(discussionValidator.unlikeDiscussionValidator), async (req, res, next) => {
        try {
            const discussion = await discussionService.unlikeDiscussion(req.params.id, req.user.id);
            res.status(httpStatus.OK).json(Success(discussion));
        } catch (error) {
            next(error);
        }
    });

    return router;
};
