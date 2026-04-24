import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Start server immediately (helps passing Render health checks quickly)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Local:            http://localhost:${PORT}`);
  
  // Connect to DB in background
  connectDB().catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    // In fallback mode, we don't exit the process
  });
});
