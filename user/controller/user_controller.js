const { Router } = require('express');
const userService = require('../service/user_service')();
const httpStatus = require('http-status');
const { Success } = require('../../utils/response');
const joiValidator = require('../../utils/joiValidator');
const userValidator = require('../validator/user_validator');

module.exports = () => {
    const router = Router();

    router.post('/', joiValidator(userValidator.createUserValidator), async (req, res, next) => {
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

    router.get('/search', joiValidator(userValidator.searchUserValidator), async (req, res, next) => {
        try {
            const users = await userService.searchUser(req.query.name);
            res.status(httpStatus.OK).json(Success(users));
        } catch (error) {
            next(error);
        }
    });

    router.get('/me', async (req, res, next) => {
        try {
            res.status(httpStatus.CREATED).json(Success(req.user));
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', joiValidator(userValidator.getUserByIdValidator), async (req, res, next) => {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(httpStatus.OK).json(Success(user));
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id', joiValidator(userValidator.updateUserByIdValidator), async (req, res, next) => {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.status(httpStatus.OK).json(Success(user));
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:id', joiValidator(userValidator.deleteUserByIdValidator), async (req, res, next) => {
        try {
            const user = await userService.deleteUser(req.params.id);
            res.status(httpStatus.OK).json(Success(user));
        } catch (error) {
            next(error);
        }
    });

    router.post('/:id/follow', joiValidator(userValidator.followUserByIdValidator), async (req, res, next) => {
        try {
            const user = await userService.followUser(req.user.id, req.params.id);
            res.status(httpStatus.OK).json(Success(user));
        } catch (error) {
            next(error);
        }
    });

    router.post('/:id/unfollow', joiValidator(userValidator.unfollowUserByIdValidator), async (req, res, next) => {
        try {
            const user = await userService.unfollowUser(req.user.id, req.params.id);
            res.status(httpStatus.OK).json(Success(user));
        } catch (error) {
            next(error);
        }
    });

    return router;
};
