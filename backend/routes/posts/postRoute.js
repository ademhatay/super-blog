const express = require('express');
const router = express.Router();
const { createPost } = require('../../controllers/posts/postController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const { photoUpload, postImageResize } = require('../../middlewares/uploads/photoUpload');

router.post(
	'/',
	authMiddleware,
	photoUpload.single('image'),
	postImageResize,
	createPost
);


module.exports = router;