const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const dbConnect = require('./config/dbConnect');

// Imports Routes
const authRoute = require('./routes/auth');

// Initialize Express
const app = express();

// Set up dotenv
dotenv.config({ path: './config/config.env' });

// Conneting to database
dbConnect();

// Devlopment Dependinces
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Logs incoming requests
  app.use(cors()); // allow all orgins to access our servers
}

// Middleware
app.use(express.json());

// Routes middleware
app.use('/api', authRoute);

// Setting up port
const PORT = process.env.PORT || 5000;

// Listen to port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
