const mongoose = require('mongoose');
const Comment = require('./Comment');

const DiscussionSchema = mongoose.Schema({
    textField: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    hashTags: {
        type: [String],
        required: true,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [Comment.schema],
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    dislikes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    recordStatus: {
        type: Number,
        default: 1,
    },
});

module.exports = mongoose.model('Discussion', DiscussionSchema);