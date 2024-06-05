const mongoose = require('mongoose');

const Comment = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
    recordStatus: {
        type: Number,
        default: 1,
    },
});

module.exports = mongoose.model('Comment', Comment);
