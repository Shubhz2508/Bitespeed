// Import required modules
const express = require('express');
const { Pool } = require('pg');

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
