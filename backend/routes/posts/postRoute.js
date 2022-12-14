const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getSinglePost, updatePost, deletePost } = require('../../controllers/posts/postController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const { photoUpload, postImageResize } = require('../../middlewares/uploads/photoUpload');

router.post(
	'/',
	authMiddleware,
	photoUpload.single('image'),
	postImageResize,
	createPost
);

router.get('/', getAllPosts);
router.get('/:id', getSinglePost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', deletePost);

module.exports = router;