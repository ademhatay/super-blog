const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const {
	createComment,
	getAllComments,
	getSingleComment,
	updateComment
} = require('../../controllers/comments/commentController');


router.post('/', authMiddleware, createComment);
router.get('/', authMiddleware, getAllComments);
router.get('/:id', authMiddleware, getSingleComment);
router.put('/:id', authMiddleware, updateComment);

module.exports = router;