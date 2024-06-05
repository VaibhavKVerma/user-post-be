const jwt = require('jsonwebtoken');
const customError = require('../../utils/customError');
const httpStatus = require('http-status');

const userService = require('../../user/service/user_service')();

module.exports = () => {
    const createJWTToken = async (data) => {
        const { password, mobile, name, email } = data;
        return jwt.sign({ password, mobile, name, email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
        });
    };

    const verifyJWTToken = async (token) => {
        return jwt.verify(token, process.env.JWT_SECRET);
    };

    const signup = async (data) => {
        const user = await userService.createUser(data);
        const token = await createJWTToken(user);
        return { token };
    };

    const login = async (data) => {
        const user = await userService.getUserByEmail(data.email);
        if (user.password !== data.password) throw customError('Invalid Credentials', httpStatus.UNAUTHORIZED);
        const token = await createJWTToken(user);
        return { token };
    };

    const me = async (token) => {
        token = token.split(' ')[1];
        const { email } = await verifyJWTToken(token);
        return await userService.getUserByEmail(email);
    };

    return {
        signup,
        login,
        me,
    };
};
