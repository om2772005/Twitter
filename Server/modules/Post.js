const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    tweet: { type: String, required: true },
    image: { type: String, default: null },
    audio: { type: String, default: null },
    video: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Post',PostSchema)