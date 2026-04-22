import mongoose from 'mongoose';

const connectDB = async () => {
  global.isDbConnected = false;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    global.isDbConnected = true;
    console.log('🔥🔥MongoDB connected successfully');
  } catch (error) {
    console.error('🔥🔥MongoDB connection error:', error.message);
    console.warn('⚠️  Backend will continue in MOCK MODE.');
    // Do NOT exit the process, allow server to run in mock mode
  }
};

export default connectDB;
