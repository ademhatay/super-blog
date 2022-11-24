const asyncHandler = require('express-async-handler')
const User = require('../../models/user/User');
const generateToken = require('../../config/token/generateToken');
const validateMongodbID = require('../../utils/validateMongodbID');
// --------------------------------------------------
// REGISTER
const userRegister = asyncHandler(async (req, res) => {
	//Check if user Exist
	const userExists = await User.findOne({ email: req?.body?.email });

	if (userExists) throw new Error("User already exists");
	try {
		//Register user
		const user = await User.create({
			firstName: req?.body?.firstName,
			lastName: req?.body?.lastName,
			email: req?.body?.email,
			password: req?.body?.password,
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
	//check if user exists
	const userFound = await User.findOne({ email });
	//Check if password is match
	if (userFound && (await userFound.matchPassword(password))) {
		const user = {
			_id: userFound?._id,
			firstName: userFound?.firstName,
			lastName: userFound?.lastName,
			email: userFound?.email,
			profilePhoto: userFound?.profilePhoto,
			isAdmin: userFound?.isAdmin,
			token: generateToken(userFound?._id),
		}
		res.json(user);
		console.log(user);
	} else {
		res.status(401);
		throw new Error("Invalid Login Credentials");
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
	// check if user id is valid
	validateMongodbID(id);
	try {
		const user = await User.findById(id);
		res.json(user);
	} catch (error) {
		res.json(error);
	}
});

// --------------------------------------------------
// User Profile
const userProfile = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	// check if user id is valid
	validateMongodbID(_id);
	try {
		const myProfile = await User.findById(_id);
		res.json(myProfile);
	} catch (error) {
		res.json(error);
	}
});


// --------------------------------------------------
// Delete User
const deleteUser = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	// check if user id is valid
	validateMongodbID(_id);
	try {
		const user = await User.findByIdAndDelete(_id);
		res.json({ message: "user delete", user });
	} catch (error) {
		res.json(error);
	}
});

// --------------------------------------------------
// Update User
const updateUser = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	// check if user id is valid
	validateMongodbID(_id);
	const user = await User.findByIdAndUpdate(_id, {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		bio: req.body.bio,
	}, {
		new: true,
		runValidators: true,
	});
	res.json({
		message: "user updated",
		user,
	});
});

// --------------------------------------------------
// Update Password
const updatePassword = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { password } = req.body;
	// check if user id is valid
	validateMongodbID(_id);
	const user = await User.findById(_id);
	if (password) {
		user.password = password;
		const updatedUser = await user.save();
		res.json({ message: "password updated", updatedUser });
	} else {
		res.status(400);
		throw new Error('Invalid password');
	}
});


module.exports = {
	register: userRegister,
	login: userLogin,
	getUsers: fetchAllUsers,
	getUser: fetchSingleUser,
	deleteUser,
	updateUser,
	userProfile,
	updatePassword
}