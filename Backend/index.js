import http from 'http';
import mongoose from 'mongoose';
import { MONGO_URI, PORT } from './utils/config.js';
import app from './app.js';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });