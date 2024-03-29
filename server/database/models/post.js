const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type:String,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: [String],
    comments: [{
        text: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
    }, ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;