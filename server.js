import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT} (reachable at http://10.42.0.245:${PORT})`);
  });
}).catch((err) => {
  console.error('❌ Database connection failed:', err.message);
  process.exit(1);
});
