const asyncHandler = require('express-async-handler')
const User = require('../../models/user/User');
const generateToken = require('../../config/token/generateToken');
const validateMongodbID = require('../../utils/validateMongodbID');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cloudinaryUploadImg = require('../../utils/cloudinary');
const fs = require('fs');

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
		const myProfile = await User.findById(_id).populate('posts');
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

// --------------------------------------------------
// Follow User
const followUser = asyncHandler(async (req, res) => {
	const { followID } = req.body;
	const loginUserID = req.user.id;
	// check if user id is valid
	validateMongodbID(loginUserID);

	const loginUser = await User.findById(loginUserID);
	const targetUser = await User.findById(followID);
	// find the target user and check if the login id exist in the followers array
	const allFollowers = targetUser?.followers?.find((user) => user?._id?.toString() === loginUserID?.toString());
	if (allFollowers) {
		res.status(400);
		throw new Error('You already follow this user');
	} else {
		// add followID to login user following array
		await User.findByIdAndUpdate(followID, {
			$push: { followers: loginUserID },
			isFollowing: true,
		}, {
			new: true,
		});

		// add login user id to followID followers array
		const user = await User.findByIdAndUpdate(loginUserID, {
			$push: { following: followID },
		}, {
			new: true,
		});
	}
	res.json({ message: "user followed", yourFollowing: [...loginUser?.following, followID] });
});

// --------------------------------------------------
// Unfollow User
const unfollowUser = asyncHandler(async (req, res) => {
	const { unfollowID } = req.body;
	const loginUserID = req.user.id;

	const loginUser = await User.findById(loginUserID);
	const targetUser = await User.findById(unfollowID);

	// find the target user and check if the login id exist in the followers array
	const allFollowers = targetUser?.followers?.find((user) => user?._id?.toString() === loginUserID?.toString());

	if (allFollowers) {

		await User.findByIdAndUpdate(unfollowID, {
			$pull: { followers: loginUserID },
			isFollowing: false,
			isUnfollowing: true,
		}, {
			new: true,
		});
	} else {
		res.status(400);
		throw new Error('You already dont follow this user');
	}

	const user = await User.findByIdAndUpdate(loginUserID, {
		$pull: { following: unfollowID },

	}, {
		new: true,
	});

	res.json({ message: "user unfollowed", yourFollowing: user?.following });
});

// --------------------------------------------------
// Block User
const blockUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongodbID(id);
	const user = await User.findByIdAndUpdate(id, {
		isBlocked: true,
	}, { new: true });
	res.json({ message: "user blocked", user });
});

// --------------------------------------------------
// UnBlock User
const unBlockUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongodbID(id);
	const user = await User.findByIdAndUpdate(id, {
		isBlocked: false,
	}, { new: true });
	res.json({ message: "user unblocked", user });
});

// --------------------------------------------------
// SendMail with
// const verifyEmail = asyncHandler(async (req, res) => {
// 	let transporter = nodemailer.createTransport({
// 		service: 'gmail',
// 		host: "smtp.gmail.com",
// 		port: 456,
// 		secure: true, // true for 465, false for other ports
// 		auth: {
// 			user: process.env.EMAIL_USERNAME, // generated ethereal user
// 			pass: process.env.EMAIL_PASSWORD // generated ethereal password
// 		},
// 	});
// 	const emailHtmlFile = path.join(__dirname, '../../email.html');
// 	const emailHtml = fs.readFileSync(emailHtmlFile, 'utf8');
// 	let info = await transporter.sendMail({
// 		from: '"SuperBlog" <dmtrktm.31@gmail.com>', // sender address
// 		to: req.body.email, // list of receivers
// 		subject: "Hesabınızı Doğrulayın", // Subject line
// 		text: "", // plain text body
// 		html: emailHtml, // html body
// 	});

// 	res.json({ message: "email sent", info });

// });

// --------------------------------------------------
//	generateVerifyEmailToken
const generateVerifyEmailToken = asyncHandler(async (req, res) => {
	const loginUserID = req.user.id;
	const user = await User.findById(loginUserID);

	try {
		// generate token
		const verificationToken = await user.verifyAccount();
		user.save();
		// build message
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			host: "smtp.gmail.com",
			port: 456,
			secure: true, // true for 465, false for other ports
			auth: {
				user: process.env.EMAIL_USERNAME, // generated ethereal user
				pass: process.env.EMAIL_PASSWORD // generated ethereal password
			},
		});
		const resetURL = `If you were requested to verify your account, verify within 10 minutes, otherwise ignore this email <a href="http://localhost:3000/verify-account/${verificationToken}">Verify</a>`;
		const msg = await transporter.sendMail({
			to: req.user.email,
			from: process.env.EMAIL_USERNAME,
			subject: 'Hesabınızı Doğrulayın',
			html: resetURL,
		});
		res.json({ resetURL });

	} catch (error) {
		console.log(error);
	};
});

// --------------------------------------------------
//	Account Verification
const accountVerification = asyncHandler(async (req, res) => {
	const { token } = req.body
	const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
	const userFound = await User.findOne({
		accountVerificationToken: hashedToken,
		accountVerificationTokenExpires: { $gt: Date.now() },
	});
	if (!userFound) {
		res.status(400);
		throw new Error('Token is invalid or has expired');
	}
	// update user
	userFound.isAccountVerified = true;
	userFound.accountVerificationToken = undefined;
	userFound.accountVerificationTokenExpires = undefined;
	await userFound.save();
	res.json(userFound);
});

// --------------------------------------------------
//	Forget Token Generate
const forgetPasswordToken = asyncHandler(async (req, res) => {
	// find the user by email
	const { email } = req.user;
	const user = await User.findOne({ email });
	if (!user) {
		res.status(400);
		throw new Error('There is no user with this email, try login');
	}
	try {
		// generate token
		const resetToken = await user.resetPasswordTokenGenerate();
		user.save();
		// build message
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			host: "smtp.gmail.com",
			port: 456,
			secure: true, // true for 465, false for other ports
			auth: {
				user: process.env.EMAIL_USERNAME, // generated ethereal user
				pass: process.env.EMAIL_PASSWORD // generated ethereal password
			},
		});
		const resetURL = `If you were requested to reset your password, reset within 10 minutes, otherwise ignore this email <a href="http://localhost:3000/reset-password/${resetToken}">Reset</a>`;

		const msg = await transporter.sendMail({
			to: req.user.email,
			from: process.env.EMAIL_USERNAME,
			subject: 'Şifrenizi Sıfırlayın',
			html: resetURL,
		});
		res.json({ resetURL });
	} catch (error) {
		console.log(error);
	}
});

// -------------------------------------------------
//	Reset Password
const resetPassword = asyncHandler(async (req, res) => {
	const { token, password } = req.body;
	const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
	const user = await User.findOne({
		passwordResetToken: hashedToken
	});
	if (!user) {
		res.status(400);
		throw new Error('Token is invalid or has expired, try again later');
	}
	// update user
	user.password = password;
	user.passwordResetToken = undefined;
	user.passwordResetTokenExpires = undefined;
	user.passwordChangedAt = Date.now();
	await user.save();
	res.json({ msg: "password changed succesfully", user });
});

// -------------------------------------------------
//	Profile Picture Upload

const profilePhotoUpload = asyncHandler(async (req, res) => {
	// get user id
	const { _id } = req.user;
	// first get image path
	const localPath = `public/images/profile/${req.file.filename}`;

	// upload image to cloudinary
	const result = await cloudinaryUploadImg(localPath);
	// update user
	const user = await User.findByIdAndUpdate
		(_id, { profilePhoto: result.url }, { new: true });
	// delete image from local
	fs.unlinkSync(localPath, (err) => {
		if (err) {
			console.log(err);
		}
	});

	res.json({ msg: "profile photo uploaded" });
});

module.exports = {
	register: userRegister,
	login: userLogin,
	getUsers: fetchAllUsers,
	getUser: fetchSingleUser,
	deleteUser,
	updateUser,
	userProfile,
	updatePassword,
	followUser,
	unfollowUser,
	blockUser,
	unBlockUser,
	generateVerifyEmailToken,
	accountVerification,
	forgetPasswordToken,
	resetPassword,
	pPhotoUpload: profilePhotoUpload
}