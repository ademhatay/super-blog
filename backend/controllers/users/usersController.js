const asyncHandler = require('express-async-handler')
const User = require('../../models/user/User');
const generateToken = require('../../config/token/generateToken');
const validateMongodbID = require('../../utils/validateMongodbID');
// --------------------------------------------------
// REGISTER
const userRegister = asyncHandler(async (req, res) => {
	// check if user already exists
	const userExists = await User.findOne({ email: req.body.email });
	if (userExists) throw new Error('User already exists');
	try {
		// Register new User
		const { firstName, lastName, email, password } = req.body;
		const user = await User.create({
			// ex:: firstName: firstName,
			firstName,
			lastName,
			email,
			password
		});
		res.json(user);
	} catch (error) {
		res.json(error);
	}
});

// --------------------------------------------------
// LOGIN
const userLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			profilePhoto: user.profilePhoto,
			isAdmin: user.isAdmin,
			token: generateToken(user._id)
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});


// --------------------------------------------------
// FETCH ALL USERS
const fetchAllUsers = asyncHandler(async (req, res) => {
	try {
		const users = await User.find({});
		res.json(users);
	} catch (error) {
		res.json(error);
	}
});

// --------------------------------------------------
// Get Single User
const fetchSingleUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongodbID(id);
	try {
		const user = await User.findById(id);
		res.json(user);
	} catch (error) {
		res.json(error);
	}
});

// --------------------------------------------------
// Delete User
const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	// check if user id is valid
	validateMongodbID(id);
	try {
		const user = await User.findByIdAndDelete(id);
		res.json({ message: "user delete" });
	} catch (error) {
		res.json(error);
	}
});

// --------------------------------------------------
// Update User
const updateUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findByIdAndUpdate(id);
		res.json(user);
	} catch (error) {
		res.json(error);
	}
});

module.exports = {
	register: userRegister,
	login: userLogin,
	getUsers: fetchAllUsers,
	getUser: fetchSingleUser,
	deleteUser,
	updateUser

}