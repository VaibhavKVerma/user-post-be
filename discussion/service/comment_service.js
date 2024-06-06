const customError = require('../../utils/customError');
const httpStatus = require('http-status');
const commentRepository = require('../repository/comment_repository')();
const discussionService = require('./discussion_service')();

module.exports = () => {
    const createComment = async (comment, discussionId, userId) => {
        const discussion = await discussionService.getDiscussionById(discussionId);
        const newComment = await commentRepository.createComment({ ...comment, userId });
        discussion.comments.push(newComment);
        return await discussionService.updateDiscussion(discussionId, discussion, discussion.userId);
    };

    const getCommentById = async (id) => {
        const comment = await commentRepository.getCommentById(id);
        if (!comment) {
            throw customError('Comment not found', httpStatus.NOT_FOUND);
        }
        return comment;
    };

    const updateComment = async (id, comment, discussionId, userId) => {
        await getCommentById(id);
        const discussion = await discussionService.getDiscussionById(discussionId);
        const commentIndex = discussion.comments.findIndex((comment) => comment._id.toString() === id);
        if (commentIndex === -1) {
            throw customError('Comment not found in discussion', httpStatus.NOT_FOUND);
        }
        const existingComment = discussion.comments[commentIndex];
        if (existingComment.userId.toString() !== userId.toString()) {
            throw customError('Unauthorized', httpStatus.UNAUTHORIZED);
        }
        const newComment = await commentRepository.updateComment(id,comment);
        discussion.comments[commentIndex] = newComment;
        return discussionService.updateDiscussion(discussionId, discussion, discussion.userId);
    };

    const deleteComment = async (id, discussionId, userId) => {
        const discussion = await discussionService.getDiscussionById(discussionId);
        const comment = await getCommentById(id);
        if (comment.userId.toString() !== userId.toString()) {
            throw customError('Unauthorized', httpStatus.UNAUTHORIZED);
        }
    };

    const likeComment = async (id, discussionId, userId) => {
        const discussion = await discussionService.getDiscussionById(discussionId);
        const comment = await getCommentById(id);
        if (comment.likes.includes(userId)) {
            throw customError('Already liked', httpStatus.BAD_REQUEST);
        }
        comment.likes.push(userId);
        return updateComment(id, comment, discussionId, discussion.userId);
    };

    const unlikeComment = async (id, discussionId, userId) => {
        const discussion = await discussionService.getDiscussionById(discussionId);
        const comment = await getCommentById(id);
        if (!comment.likes.includes(userId)) {
            throw customError('Not liked', httpStatus.BAD_REQUEST);
        }
        comment.likes = comment.likes.filter((id) => id.toString() !== userId);
        return updateComment(id, comment, discussionId, discussion.userId);
    };

    const reply = async (id, discussionId, text, userId) => {
        const discussion = await discussionService.getDiscussionById(discussionId);
        const comment = await getCommentById(id);
        const reply = {
            ...text,
            userId,
        }
        comment.replies.push(reply);
        return updateComment(id, comment, discussionId, discussion.userId);
    };

    return {    
        createComment,
        updateComment,
        deleteComment,
        likeComment,
        unlikeComment,
        reply,
    };
};
