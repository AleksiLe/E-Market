const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Initialize the database connection
const { db } = require('./config/dbConfig');

// Middleware to parse JSON bodies
app.use(express.json());

// Function to set up routes dynamically
const setupRoutes = (dir, baseUrl) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      setupRoutes(fullPath, `${baseUrl}/${file}`);
    } else if (file.endsWith('.js')) {
      const routePath = `${baseUrl}/${path.basename(file, '.js')}`;
      const route = require(fullPath);
      app.use(routePath, route);
    }
  });
};

// Set up routes from the routes directory
setupRoutes(path.join(__dirname, 'routes'), '');

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});