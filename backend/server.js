const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbConnect = require('./config/db/dbConnect');
const userRoute = require('./routes/users/usersRoute');
const postRoute = require('./routes/posts/postRoute');
const commentRoute = require('./routes/comments/commentRoute');
const emailMessageRoute = require('./routes/emailMessage/emailMessageRoute');
const categoryRoute = require("./routes/category/categoryRoute");
const { errorHandler, notFound } = require('./middlewares/error/errorHandler');



const app = express();
// Connect to database
dbConnect();

//Middleware
app.use(express.json());
app.use(
	cors({
		origin: '*',
	})
)
// Custom Middleware

// Routes
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use("/api/email", emailMessageRoute);
app.use("/api/category", categoryRoute);

// Error Handler
app.use(notFound);
app.use(errorHandler);
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})