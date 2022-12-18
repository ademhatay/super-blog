const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const {sendEmailMessage} = require('../../controllers/email/emailMessageController');

router.post("/", authMiddleware, sendEmailMessage);



module.exports = router;