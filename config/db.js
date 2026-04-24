import mongoose from 'mongoose';

global.isDbConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Fail fast (5s) to allow mock mode to kick in
    });
    global.isDbConnected = true;
    console.log(`🔥🔥MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('🔥🔥MongoDB connection error:', error.message);
    console.warn('⚠️  Backend will continue in MOCK MODE.');
    global.isDbConnected = false;
  }
};

export default connectDB;
