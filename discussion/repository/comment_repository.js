const Comment = require('../models/Comment');

module.exports = () => {
    const createComment = async (comment) => {
        return Comment.create({ ...comment, recordStatus: 1 });
    };

    const getCommentById = async (id) => {
        return Comment.findOne({ _id: id, recordStatus: 1 });
    };

    const updateComment = async (id, comment) => {
        return Comment.findOneAndUpdate({ _id: id, recordStatus: 1 }, comment, {
            new: true,
            runValidators: true,
        });
    };

    const deleteComment = (id, comment) => {
        return Comment.findOneAndUpdate(
            { _id: id, recordStatus: 1 },
            { recordStatus: 0 },
            {
                new: true,
            }
        );
    };

    return {
        createComment,
        getCommentById,
        updateComment,
        deleteComment,
    };
};
