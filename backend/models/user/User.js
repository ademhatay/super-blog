const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// compile schema into a model
const User = mongoose.model('User', userSchema);

module.exports = User;