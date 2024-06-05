const Discussion = require('../models/Discussion');

module.exports = () => {
    const createDiscussion = async (data) => {
        return Discussion.create({ ...data, recordStatus: 1 });
    };

    const getDiscussionById = async (id) => {
      return Discussion.findOne({ _id: id, recordStatus: 1 });
    };  

    const getDiscussionsByTag = async (tag) => {
      return Discussion.find({ hashTags: { $in: tag }, recordStatus: 1 });
    };

    const getDiscussionsByText = async (text) => {
      return Discussion.find({ textField: { $regex: text, $options: 'i' }, recordStatus: 1 });
    };

    const updateDiscussion = async (id, discussion) => {
      return Discussion.findOneAndUpdate({ _id: id, recordStatus: 1 }, discussion, { new: true });
    };

    const deleteDiscussion = async (id) => {
        return Discussion.findOneAndUpdate({ _id: id, recordStatus: 1 }, { recordStatus: 0 }, { new: true });
    };

    return {
        createDiscussion,
        getDiscussionById,
        getDiscussionsByTag,
        getDiscussionsByText,
        updateDiscussion,
        deleteDiscussion,
    };
};
