const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/db/dbConnect');
const userRoute = require('./routes/users/usersRoute');
const { errorHandler, notFound } = require('./middlewares/error/errorHandler');
const app = express();
// Connect to database
dbConnect();

//Middleware
app.use(express.json());

// Custom Middleware
app.get('/', (req, res) => {
	res.send('API is running...');
})
// Routes
app.use('/api/users', userRoute);


// Error Handler
app.use(notFound);
app.use(errorHandler);
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})