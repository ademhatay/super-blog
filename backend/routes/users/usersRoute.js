const express = require('express');
const router = express.Router();
const  {register,login, getUsers, getUser, deleteUser, updateUser, userProfile} = require('../../controllers/users/usersController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');

// Fetch all users
router.get('/',authMiddleware, getUsers);
// Get user by id
router.get('/:id', getUser);
// Update user by id
router.put('/:id', updateUser);
// Delete user by id
router.delete('/:id', deleteUser)
// Get Profile
router.get('/profile/:id',authMiddleware, userProfile);
// Register
router.post('/register', register);
// Login
router.post('/login', login);




module.exports = router;