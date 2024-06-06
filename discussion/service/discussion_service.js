const discussionRepository = require('../repository/discussion_repository')();
const httpStatus = require('http-status');
const customError = require('../../utils/customError');

module.exports = () => {
    const createDiscussion = async (discussion, userId) => {
        return discussionRepository.createDiscussion({ ...discussion, userId });
    };

    const getDiscussionsByTag = async (tag) => {
        return discussionRepository.getDiscussionsByTag(tag);
    };

    const getDiscussionsByText = async (text) => {
        return discussionRepository.getDiscussionsByText(text);
    };

    const getDiscussionById = async (id, isView = false) => {
        const discussion = await discussionRepository.getDiscussionById(id);
        if (!discussion) {
            throw customError('Discussion not found', httpStatus.NOT_FOUND);
        }
        if (isView) {
            const updatedDiscussion = await discussionRepository.updateDiscussion(id, { viewCount: discussion.viewCount + 1 });
            return updatedDiscussion;
        }
        return discussion;
    };

    const updateDiscussion = async (id, discussion, userId) => {
        const data = await getDiscussionById(id);
        if (data.userId.toString() !== userId.toString()) {
            throw customError('Unauthorized', httpStatus.UNAUTHORIZED);
        }
        return discussionRepository.updateDiscussion(id, discussion);
    };

    const deleteDiscussion = async (id, userId) => {
        const discussion = await getDiscussionById(id);
        if (discussion.userId.toString() !== userId.toString()) {
            throw customError('Unauthorized', httpStatus.UNAUTHORIZED);
        }
        return discussionRepository.deleteDiscussion(id);
    };

    const likeDiscussion = async (id, userId) => {
        const discussion = await getDiscussionById(id);
        if (discussion.likes.includes(userId)) {
            throw customError('Already liked', httpStatus.BAD_REQUEST);
        }
        discussion.likes.push(userId);
        return discussionRepository.updateDiscussion(id, discussion);
    };

    const unlikeDiscussion = async (id, userId) => {
        const discussion = await getDiscussionById(id);
        if (!discussion.likes.includes(userId)) {
            throw customError('Not liked', httpStatus.BAD_REQUEST);
        }
        discussion.likes = discussion.likes.filter((id) => id.toString() !== userId);
        return discussionRepository.updateDiscussion(id, discussion);
    };

    return {
        createDiscussion,
        getDiscussionsByTag,
        getDiscussionsByText,
        updateDiscussion,
        deleteDiscussion,
        likeDiscussion,
        unlikeDiscussion,
        getDiscussionById,
    };
};
