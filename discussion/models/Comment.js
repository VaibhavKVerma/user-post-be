const mongoose = require('mongoose');

const replySchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const Comment = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    createdOn: {
        type: Date,
        default: Date.now,
    },
    replies: [replySchema],
    recordStatus: {
        type: Number,
        default: 1,
    },
});

module.exports = mongoose.model('Comment', Comment);
