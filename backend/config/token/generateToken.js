const jwt = require('jsonwebtoken');
const User = require('../../models/user/User');


const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '20d'
	});
}

module.exports = generateToken;