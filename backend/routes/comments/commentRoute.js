const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const {
	createComment,
	getAllComments,
	getSingleComment,
	updateComment,
	deleteComment
} = require('../../controllers/comments/commentController');


router.post('/', authMiddleware, createComment);
router.get('/', authMiddleware, getAllComments);
router.get('/:id', authMiddleware, getSingleComment);
router.put('/:id', authMiddleware, updateComment);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;