const express = require('express');
const router = express.Router();

const {
	createPost,
	getAllPosts,
	getSinglePost,
	updatePost,
	deletePost,
	toggleAddLikePost,
	toggleAddDislikePost,
} = require('../../controllers/posts/postController');

const authMiddleware = require('../../middlewares/auth/authMiddleware');
const { photoUpload, postImageResize } = require('../../middlewares/uploads/photoUpload');

router.post(
	'/',
	authMiddleware,
	photoUpload.single('image'),
	postImageResize,
	createPost
);

router.put('/likes', authMiddleware, toggleAddLikePost);
router.put('/dislikes', authMiddleware, toggleAddDislikePost);


router.get('/', getAllPosts);
router.get('/:id', getSinglePost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', deletePost);

module.exports = router;