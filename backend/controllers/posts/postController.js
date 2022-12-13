const asyncHandler = require('express-async-handler');
const Filter = require('bad-words');
const Post = require("../../models/post/Post");
const User = require("../../models/user/User");
const validateMongodbID = require('../../utils/validateMongodbID');

const createPost = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	validateMongodbID(req.body.user);
	// is user blocked cant create post
	if (req.user.isBlocked) {
		throw new Error("You are blocked, so you dont create post");
	}
	//Check for bad words in title and description
	const filter = new Filter();
	const isProfane = filter.isProfane(req.body.title, req.body.description);
	//Block user is profane
	if (isProfane) {
		await User.findByIdAndUpdate(_id, {
			isBlocked: true,
		});
		throw new Error(
			"Creating Failed because it contains profane words and you have been blocked"
		);
	}
	try {
		const post = await Post.create(req.body);
		res.json(post);
	} catch (error) {
		res.json(error);
	}
});

module.exports = {
	createPost
};

