const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, "Post title is required"],
		trim: true
	},
	category: [{
		type: String,
		required: [true, "Post category is required"],
		ref: 'Category'
	}],
	isLiked: {
		type: Boolean,
		default: false
	},
	isDisliked: {
		type: Boolean,
		default: false
	},
	numViews: {
		type: Number,
		default: 0
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	dislikes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	user: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Author is required']
		}
	],
	description: {
		type: String,
		required: [true, 'Description is required'],
	},
	image: {
		type: String,
		default: 'https://cdn.pixabay.com/photo/2016/09/08/04/12/programmer-1653351_960_720.png'
	}


}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
	timestapms: true
});

// compile

const Post = mongoose.model('Post', postSchema);

module.exports = Post;