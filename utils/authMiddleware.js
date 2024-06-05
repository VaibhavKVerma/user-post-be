const httpStatus = require('http-status');
const customError = require('./customError');
const errorHandlingMiddleware = require('./errorHandlingMiddleware');
const authService = require('../auth/service/auth_service')();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return errorHandlingMiddleware(customError('Unauthorized', httpStatus.UNAUTHORIZED), req, res, next);
        }
        const user = await authService.me(token);
        req.user = { ...user._doc, id: user._id.toString() };
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authMiddleware;