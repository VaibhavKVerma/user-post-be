const Joi = require('joi');
const httpStatus = require('http-status');
const customError = require('./customError');

const joiValidator = (schema) => {
    return (req, res, next) => {

        if (schema.body) {
            const { error } = schema.body.validate(req.body);
            if (error) {
                throw next(customError(error.details[0].message,httpStatus.BAD_REQUEST))
            }
        }

        if (schema.params) {
            const { error } = schema.params.validate(req.params);
            if (error) {
                throw next(customError(error.details[0].message,httpStatus.BAD_REQUEST))
            }
        }

        if (schema.query) {
            const { error } = schema.query.validate(req.query);
            if (error) {
                throw next(customError(error.details[0].message,httpStatus.BAD_REQUEST))
            }
        }
        next();
    };
};

module.exports = joiValidator;
