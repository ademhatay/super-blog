const express = require('express');
const router = express.Router();
const { createPost } = require('../../controllers/posts/postController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');

router.post('/', authMiddleware, createPost);


module.exports = router;