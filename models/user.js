import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    supabaseId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: String,
    phoneNumber: String,
    avatarUrl: String,
    preferences: {
      theme: { type: String, enum: ['light', 'dark'], default: 'dark' },
      notifications: {
        push: { type: Boolean, default: true },
        email: { type: Boolean, default: true },
      },
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;