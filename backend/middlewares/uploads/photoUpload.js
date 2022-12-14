const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

// Storage
const multerStorage = multer.memoryStorage();

// File type check
const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new Error('Not an image! Please upload only images.', 400), false);
	}
};

const photoUpload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
	limits: { fileSize: 1000000 },
});

// image resize
const profilePhotoResize = async (req, res, next) => {
	// check if there is no file
	if (!req.file) return next();
	req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

	await sharp(req.file.buffer).resize(250, 250)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(path.join(`public/images/profile/${req.file.filename}`));

	next();
};

// post image resize
const postImageResize = async (req, res, next) => {
	// check if there is no file
	if (!req.file) return next();
	req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

	await sharp(req.file.buffer).resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(path.join(`public/images/posts/${req.file.filename}`));

	next();
};

module.exports = { photoUpload, profilePhotoResize, postImageResize };
