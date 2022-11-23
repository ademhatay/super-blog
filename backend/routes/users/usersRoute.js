const express = require('express');
const router = express.Router();
const  {register,login, getUsers, getUser, deleteUser, updateUser} = require('../../controllers/users/usersController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');

// Fetch all users
router.get('/',authMiddleware, getUsers);
// Get user by id
router.get('/:id', getUser).delete('/:id', deleteUser).put('/:id', updateUser);
// Register
router.post('/register', register);
// Login
router.post('/login', login);




module.exports = router;