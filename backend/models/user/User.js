const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// create a schema for the user
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required'],
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
	},
	profilePhoto: {
		type: String,
		default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
	},
	bio: {
		type: String,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
	postCount: {
		type: Number,
		default: 0,
	},
	isBlocked: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	role: {
		type: String,
		enum: ['Admin', 'Guest', 'Blogger'],
	},
	isFollowing: {
		type: Boolean,
		default: false,
	},
	isUnFollowing: {
		type: Boolean,
		default: false,
	},
	isAccountVerified: {
		type: Boolean,
		default: false,
	},
	accountVerificationToken: String,
	accountVerificationTokenExpires: Date,
	viewedBy: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			}
		],
	},
	followers: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			}
		],
	},
	following: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			}
		],
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetTokenExpires: Date,

	active: {
		type: Boolean,
		default: false,
	}
}, {
	toJSON: {
		virtuals: true,
	},
	toObject: {
		virtuals: true,
	},
	timestamps: true
	}
);

// virtual method to populate created posts
userSchema.virtual('posts', {
	ref: 'Post',
	foreignField: 'user',
	localField: '_id',
});


// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
	const user = this;
	if (!user.isModified('password')) return next();
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

// Verify account
userSchema.methods.verifyAccount = async function () {
	const verificationToken = await crypto.randomBytes(32).toString('hex');
	this.accountVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

	this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
	return verificationToken;
};

// Reset Password Token Generate
userSchema.methods.resetPasswordTokenGenerate = async function () {
	const resetToken = await crypto.randomBytes(32).toString('hex');
	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	this.passwordResetTokenExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
	return resetToken;
};

// compile schema into a model
const User = mongoose.model('User', userSchema);

module.exports = User;