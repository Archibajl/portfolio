/**
 * Server Interface
 *
 * Main server setup that composes route implementations.
 * Each route module exports a function that receives the Express app.
 */

require('dotenv').config();
const express = require('express');
const path = require('path');

// Route implementations
const photosRoutes = require('./routes/photos');
const chatRoutes = require('./routes/chat');

function createServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Register route implementations
  photosRoutes(app);
  chatRoutes(app);

  // Serve static files from the React app build directory
  app.use(express.static(path.join(__dirname, '..', 'build')));

  // Also serve public folder for development/direct access
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });

  return { app, PORT };
}

function startServer() {
  const { app, PORT } = createServer();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
}

module.exports = { createServer, startServer };
