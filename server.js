/**
 * Server Entry Point
 *
 * This file serves as the entry point that delegates to the modular server implementation.
 * The actual server logic is organized in the server/ directory:
 *   - server/index.js - Main server interface
 *   - server/routes/photos.js - Photo API routes (Cloudflare R2)
 *   - server/routes/chat.js - AI Chat API routes (Ollama)
 */

const { startServer } = require('./server/index');

startServer();
