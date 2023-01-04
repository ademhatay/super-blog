const asyncHandler = require('express-async-handler');
const Filter = require('bad-words');
const Post = require("../../models/post/Post");
const User = require("../../models/user/User");
const validateMongodbID = require('../../utils/validateMongodbID');
const cloudinaryUploadImg = require('../../utils/cloudinary');
const fs = require('fs');

// ------------------ CREATE POST ------------------
// -------------------------------------------------
const createPost = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	// validateMongodbID(req.body.user);
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

	// first get image path
	const localPath = `public/images/posts/${req.file.filename}`;

	// upload image to cloudinary
	const result = await cloudinaryUploadImg(localPath);

	try {
		const post = await Post.create({
			...req.body,
			image: result.url,
			user: _id
		});
		res.json(post);
	} catch (error) {
		res.json(error);
	}
	// delete image from local
	fs.unlinkSync(localPath, (err) => {
		if (err) {
			console.log(err);
		}
	});
});


// ------------------ GET ALL POST -----------------
// -------------------------------------------------
const getAllPosts = asyncHandler(async (req, res) => {
	const { limit } = req.query;
	if (limit) {
		const posts = await Post.find({}).limit(parseInt(limit)).populate('user').populate('category').populate("comments");
		res.json(posts);
		return;
	} else {
		try {
			const posts = await Post.find({}).populate('user').populate('category').populate("comments")
			res.json(posts);
		} catch (error) {
			res.json(error);
		}
	}
});

// --------------- GET SINGLE POST -----------------
// -------------------------------------------------
const getSinglePost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongodbID(id);

	try {
		const post = await Post.findById(id).populate('user').populate('dislikes').populate('likes').populate("comments");
		// update number of views
		await Post.findByIdAndUpdate(id, {
			$inc: { numViews: 1 },
		}, { new: true });
		res.json(post);
	} catch (error) {
		res.json(error);
	}
});

// ----------------- UPDATE POST -------------------
// -------------------------------------------------
const updatePost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongodbID(id);

	try {
		const post = await Post.findByIdAndUpdate(
			id,
			{
				...req.body,
				user: req.user?._id,
			},
			{
				new: true,
			}
		);
		res.json(post);
	} catch (error) {
		res.json(error);
	}
});


// ----------------- DELETE POST -------------------
// -------------------------------------------------
const deletePost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongodbID(id);
	try {
		const post = await Post.findOneAndDelete(id);
		res.json(post);
	} catch (error) {
		res.json(error);
	}
});


// ----------------- Likes -------------------------
// -------------------------------------------------
const toggleAddLikePost = asyncHandler(async (req, res) => {
	//1.Find the post to be liked
	const { postId } = req.body;
	const post = await Post.findById(postId).populate('user');
	//2. Find the login user
	const loginUserId = req?.user?._id;
	//3. Find is this user has liked this post?
	const isLiked = post?.isLiked;
	//4.Chech if this user has dislikes this post
	const alreadyDisliked = post?.dislikes?.find(
		userId => userId?.toString() === loginUserId?.toString()
	);
	//5.remove the user from dislikes array if exists
	if (alreadyDisliked) {
		const post = await Post.findByIdAndUpdate(
			postId,
			{
				$pull: { dislikes: loginUserId },
				isDisLiked: false,
			},
			{ new: true }
		).populate('user');
		res.json(post);
	}
	//Toggle
	//Remove the user if he has liked the post
	if (isLiked) {
		const post = await Post.findByIdAndUpdate(
			postId,
			{
				$pull: { likes: loginUserId },
				isLiked: false,
			},
			{ new: true }
		).populate('user');
		res.json(post);
	} else {
		//add to likes
		const post = await Post.findByIdAndUpdate(
			postId,
			{
				$push: { likes: loginUserId },
				isLiked: true,
			},
			{ new: true }
		).populate('user');
		res.json(post);
	}
});


// ----------------- DisLikes ----------------------
// -------------------------------------------------
const toggleAddDislikePost = asyncHandler(async (req, res) => {
	//1.Find the post to be disLiked
	const { postId } = req.body;
	const post = await Post.findById(postId);
	//2.Find the login user
	const loginUserId = req?.user?._id;
	//3.Check if this user has already disLikes
	const isDisLiked = post?.isDisliked;
	//4. Check if already like this post
	const alreadyLiked = post?.likes?.find(
		userId => userId.toString() === loginUserId?.toString()
	);
	//Remove this user from likes array if it exists
	if (alreadyLiked) {
		const post = await Post.findOneAndUpdate(
			postId,
			{
				$pull: { likes: loginUserId },
				isLiked: false,
			},
			{ new: true }
		);
		res.json(post);
	}
	//Toggling
	//Remove this user from dislikes if already disliked
	if (isDisLiked) {
		const post = await Post.findByIdAndUpdate(
			postId,
			{
				$pull: { dislikes: loginUserId },
				isDisliked: false,
			},
			{ new: true }
		);
		res.json(post);
	} else {
		const post = await Post.findByIdAndUpdate(
			postId,
			{
				$push: { dislikes: loginUserId },
				isDisliked: true,
			},
			{ new: true }
		);
		res.json(post);
	}

});

module.exports = {
	createPost,
	getAllPosts,
	getSinglePost,
	updatePost,
	deletePost,
	toggleAddLikePost,
	toggleAddDislikePost,
};
