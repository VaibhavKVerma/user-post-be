const User = require('../models/User');

module.exports = () => {
    const createUser = async (user) => {
        return User.create({ ...user, recordStatus: 1 });
    };

    const getUsers = async () => {
        return User.find({ recordStatus: 1 });
    };

    const getUserById = async (id) => {
        return User.findOne({ _id: id, recordStatus: 1 });
    };

    const updateUser = async (id, user) => {
        return User.findOneAndUpdate({ _id: id, recordStatus: 1 }, user, {
            new: true,
            runValidators: true,
        });
    };

    const deleteUser = async (id) => {
        return User.findOneAndUpdate({ _id: id, recordStatus: 1 }, { recordStatus: 0 }, { new: true });
    };

    const searchUser = async (name) => {
        return User.find({ name: { $regex: name, $options: 'i' } });
    };

    const followUser = async (id, followId) => {
        return User.bulkWrite([
            {
                updateOne: {
                    filter: { _id: id, recordStatus: 1 },
                    update: { $addToSet: { following: followId } },
                },
            },
            {
                updateOne: {
                    filter: { _id: followId, recordStatus: 1 },
                    update: { $addToSet: { followers: id } },
                },
            },
        ]);
    };

    const unfollowUser = async (id, followId) => {
        return User.bulkWrite([
            {
                updateOne: {
                    filter: { _id: id, recordStatus: 1 },
                    update: { $pull: { following: followId } },
                },
            },
            {
                updateOne: {
                    filter: { _id: followId, recordStatus: 1 },
                    update: { $pull: { followers: id } },
                },
            },
        ]);
    };

    const getUserByEmail = async (email) => {
        return User.findOne({ email, recordStatus: 1 });
    };

    const getUserByMobile = async (mobile) => {
        return User.findOne({ mobile, recordStatus: 1 });
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
        getUserByMobile,
    };
};
