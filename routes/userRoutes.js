import express from 'express';
import { getProfile, updateProfile, updatePreferences, deleteAccount } from '../controllers/userController.js';
import supabaseAuth from '../middlewares/supabaseAuth.js';

const router = express.Router();

// Apply auth middleware to all user routes
router.use(supabaseAuth);

// Profile logic
router.get('/profile', getProfile);
router.patch('/profile', updateProfile);

// Preferences logic
router.patch('/preferences', updatePreferences);

// Account management
router.delete('/account', deleteAccount);

export default router;
