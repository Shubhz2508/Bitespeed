// Import required modules
const express = require('express');
const pool = require('./database'); // Import the pool object from database.js

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000; // Use the specified port or default to 3000

// Import route handling code
const routes = require('./route');

// Middleware to parse JSON request bodies automatically
app.use(express.json());

// Define the '/identify' route
app.use('/', routes);

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
