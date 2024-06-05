const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    recordStatus: {
        type: Number,
        default: 1,
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    }
});

module.exports = mongoose.model("User", UserSchema);