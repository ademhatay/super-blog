const express = require('express');
const router = express.Router();
const { register, login, getUsers, getUser, deleteUser, updateUser, userProfile, updatePassword } = require('../../controllers/users/usersController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');

// Register
router.post('/register', register);
// Login
router.post('/login', login);

// Fetch all users
router.get('/', authMiddleware, getUsers);
// Update Password user by id
router.put('/password', authMiddleware, updatePassword);
// Get Login User Profile
router.get('/profile',authMiddleware, userProfile);
// Update user by id
router.put('/', authMiddleware, updateUser);
// Delete user by id
router.delete('/',authMiddleware, deleteUser)
// Get user by id
router.get('/:id',authMiddleware, getUser);

module.exports = router;