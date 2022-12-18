const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: [true, 'Comment must belong to a post'],
	},
	user: {
		type: Object,
		required: [true, 'Comment must belong to a user'],
	},
	description: {
		type: String,
		required: [true, 'Comment must have a description'],
	}
}, {
	timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;