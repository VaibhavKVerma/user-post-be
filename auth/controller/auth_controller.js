const { Router } = require('express');
const httpStatus = require('http-status');
const { Success } = require('../../utils/response');
const authValidator = require('../validator/auth_validator');
const joiValidator = require('../../utils/joiValidator');
const authService = require('../service/auth_service')();

module.exports = () => {
    const router = Router();

    router.post('/signup', joiValidator(authValidator.signupValidator), async (req, res, next) => {
        try {
            const user = await authService.signup(req.body);
            res.status(httpStatus.CREATED).json(Success(user));
        } catch (error) {
            next(error);
        }
    });

    router.post('/login', joiValidator(authValidator.loginValidator), async (req, res, next) => {
        try {
            const user = await authService.login(req.body);
            res.status(httpStatus.OK).json(Success(user));
        } catch (error) {
            next(error);
        }
    });

    return router;
};
