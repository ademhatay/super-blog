const express = require('express');
const router = express.Router();
const { register, login, getUsers, getUser, deleteUser, updateUser, userProfile, updatePassword, followUser, unfollowUser, blockUser, unBlockUser, generateVerifyEmailToken, accountVerification } = require('../../controllers/users/usersController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');

// Register
router.post('/register', register);
// Login
router.post('/login', login);

// Fetch all users
router.get('/', authMiddleware, getUsers);
// generateVerifyEmailToken
// router.post('/send-mail', authMiddleware, verifyEmail);
// generateVerifyEmailToken
router.post(
	'/generate-verify-email-token',
	authMiddleware,
	generateVerifyEmailToken
);
// Verify Account
router.put(
	'/verify-account',
	authMiddleware,
	accountVerification
);
// Update Password user login user
router.put('/password', authMiddleware, updatePassword);
// Follow User
router.put('/follow', authMiddleware, followUser);
// Follow User
router.put('/unfollow', authMiddleware, unfollowUser);
// Block User
router.put('/block-user/:id', authMiddleware, blockUser);
// UnBlock User
router.put('/unblock-user/:id', authMiddleware, unBlockUser);
// Get Login User Profile
router.get('/profile', authMiddleware, userProfile);
// Update user by login user
router.put('/', authMiddleware, updateUser);
// Delete user by login user
router.delete('/', authMiddleware, deleteUser)
// Get user by id
router.get('/:id', authMiddleware, getUser);

module.exports = router;