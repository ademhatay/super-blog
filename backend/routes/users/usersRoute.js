const express = require('express');
const router = express.Router();
const { register, login, getUsers, getUser, deleteUser, updateUser, userProfile, updatePassword, followUser, unfollowUser, blockUser, unBlockUser, generateVerifyEmailToken, accountVerification, forgetPasswordToken, resetPassword, pPhotoUpload } = require('../../controllers/users/usersController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const { photoUpload, profilePhotoResize } = require('../../middlewares/uploads/photoUpload');

// Register
router.post('/register', register);
// Login
router.post('/login', login);
// Forget Password TOKEN
router.put('/profilePhoto-upload',
	photoUpload.single('image'),
	authMiddleware,
	profilePhotoResize,
	pPhotoUpload
);
// Fetch all users
router.get('/', authMiddleware, getUsers);

// generateVerifyEmailToken
// router.post('/send-mail', authMiddleware, verifyEmail);


// Forget Password TOKEN
router.post('/forget-password-token', authMiddleware, forgetPasswordToken);
// resetPassword
router.put('/reset-password', authMiddleware, resetPassword);
// Update Password user login user
router.put('/password', authMiddleware, updatePassword);
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