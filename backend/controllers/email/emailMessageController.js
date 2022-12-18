const asyncHandler = require('express-async-handler')
const emailMessage = require('../../models/emailMessage/emailMessage');
const validateMongodbID = require('../../utils/validateMongodbID');
const nodemailer = require('nodemailer');

const sendEmailMessage = asyncHandler(async (req, res) => {
	const {to, subject, message} = req.body;
	try {
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
		const msg = await transporter.sendMail({
			to: to,
			from: process.env.EMAIL_USERNAME,
			subject: subject,
			text: message
		});
		// save to db email
		await emailMessage.create({
			sentBy: req?.user?._id,
			fromEmail: req?.user?.email,
			toEmail: to,
			message,
			subject
		});
		res.json({ message: "message sended", msg });

	} catch (error) {
		console.log(error);
	};
});

module.exports = {
	sendEmailMessage
}