const httpStatus = require('http-status');
const customError = require('../../utils/customError');

const userRepository = require('../repository/user_repository')();

module.exports = () => {
    const createUser = async (user) => {
        const userExist = await userRepository.getUserByEmail(user.email);
        if (userExist) {
            throw customError('User already exist with email', httpStatus.CONFLICT);
        }
        const mobileExist = await userRepository.getUserByMobile(user.mobile);
        if (mobileExist) {
            throw customError('User already exist with mobile', httpStatus.CONFLICT);
        }
        return userRepository.createUser(user);
    };

    const getUsers = async () => {
        return userRepository.getUsers();
    };

    const getUserById = async (id) => {
        const user = await userRepository.getUserById(id);
        if (!user) {
            throw customError('User not found', httpStatus.NOT_FOUND);
        }
        return user;
    };

    const updateUser = async (id, user) => {
        await getUserById(id);
        const userExist = await userRepository.getUserByEmail(user.email);
        if (userExist && userExist._id.toString() !== id) {
            throw customError('User already exist with email', httpStatus.CONFLICT);
        }
        const mobileExist = await userRepository.getUserByMobile(user.mobile);
        if (mobileExist && mobileExist._id.toString() !== id) {
            throw customError('User already exist with mobile', httpStatus.CONFLICT);
        }
        return userRepository.updateUser(id, user);
    };

    const deleteUser = async (id) => {
        await getUserById(id);
        await Promise.all([userRepository.unfollowUser(null, id), userRepository.deleteUser(id)]);
        return { message: 'User deleted successfully' };
    };

    const searchUser = async (name) => {
        return userRepository.searchUser(name);
    };

    const followUser = async (id, followId) => {
        if (id === followId) {
            throw customError('You cannot follow yourself', httpStatus.BAD_REQUEST);
        }
        const user = await getUserById(id);
        if (user.following.includes(followId)) {
            throw customError('Already following', httpStatus.CONFLICT);
        }
        await getUserById(followId);
        return userRepository.followUser(id, followId);
    };

    const unfollowUser = async (id, followId) => {
        if (id === followId) {
            throw customError('You cannot unfollow yourself', httpStatus.BAD_REQUEST);
        }
        const user = await getUserById(id);
        if (!user.following.includes(followId)) {
            throw customError('Already Not following', httpStatus.CONFLICT);
        }
        await getUserById(followId);
        return userRepository.unfollowUser(id, followId);
    };

    const getUserByEmail = async (email) => {
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            throw customError('User not found', httpStatus.NOT_FOUND);
        }
        return user;
    };

    return {
        createUser,
        getUsers,
        getUserById,
        updateUser,
        deleteUser,
        searchUser,
        followUser,
        unfollowUser,
        getUserByEmail,
    };
};
