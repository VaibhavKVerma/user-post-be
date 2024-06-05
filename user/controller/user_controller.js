const { Router } = require('express');
const userService = require('../service/user_service')();
const httpStatus = require('http-status');
const { Success } = require('../../utils/response');
const customError = require('../../utils/customError');

module.exports = () => {
    const router = Router();

    router.post('/', async (req, res, next) => {
        try {
            const user = await userService.createUser(req.body);
            res.status(httpStatus.CREATED).json(Success(user));
        } catch (error) {
            next(error);
        }
    });

    router.get('/', async (req, res, next) => {
        try {
            const users = await userService.getUsers();
            res.status(httpStatus.OK).json(Success(users));
        } catch (error) {
            next(error);
        }
    });

    router.get('/search', async (req, res, next) => {
        try {
            const users = await userService.searchUser(req.query.name);
            res.status(httpStatus.OK).json(Success(users));
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', async (req, res, next) => {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(httpStatus.OK).json(Success(user));
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id', async (req, res, next) => {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.status(httpStatus.OK).json(Success(user));
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:id', async (req, res, next) => {
        try {
            const user = await userService.deleteUser(req.params.id);
            res.status(httpStatus.OK).json(Success(user));
        } catch (error) {
            next(error);
        }
    });

    router.post('/:id/follow', async (req, res, next) => {
        try {
            const userId = req.user.id;
            if (userId === req.params.id) {
                return next(customError('You cannot follow yourself', httpStatus.BAD_REQUEST));
            }
            const user = await userService.followUser(userId, req.params.id);
            res.status(httpStatus.OK).json(Success(user));
        } catch (error) {
            next(error);
        }
    });

    router.post('/:id/unfollow', async (req, res, next) => {
        try {
            const userId = req.user.id;
            if (userId === req.params.id) {
                return next(customError('You cannot unfollow yourself', httpStatus.BAD_REQUEST));
            }
            const user = await userService.unfollowUser(userId, req.params.id);
            res.status(httpStatus.OK).json(Success(user));
        } catch (error) {
            next(error);
        }
    });

    return router;
};