const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Initialize the database connection
const { db } = require('./config/dbConfig');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

const cors = require('cors');
const corsOptions = {
  origin: [
    process.env.NEXT_URL,
    process.env.LOCAL_URL
  ],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

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