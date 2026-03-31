import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';

dotenv.config();

const test = async () => {
  try {
    console.log('Connecting to:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    const testId = 'test-supabase-id-' + Date.now();
    const newUser = await User.create({
      supabaseId: testId,
      email: `test-${Date.now()}@example.com`,
      fullName: 'Test User',
      preferences: { theme: 'dark' }
    });

    console.log('User created:', newUser.fullName);

    const found = await User.findOne({ supabaseId: testId });
    console.log('User found:', found.fullName);

    await User.deleteOne({ supabaseId: testId });
    console.log('User deleted');

    await mongoose.disconnect();
    console.log('Disconnected');
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
};

test();
