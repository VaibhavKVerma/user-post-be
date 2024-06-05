const mongoose = require('mongoose');
const Comment = require('./Comment');

const DiscussionSchema = mongoose.Schema({
    textField: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    hashTags: {
        type: [String],
        default: [],
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
        required: true,
    },
    comments: [Comment.schema],
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    recordStatus: {
        type: Number,
        default: 1,
    },
});

module.exports = mongoose.model('Discussion', DiscussionSchema);