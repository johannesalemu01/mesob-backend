import express from 'express';
import { getHistory } from '../controllers/loyaltyController.js';
import supabaseAuth from '../middlewares/supabaseAuth.js';

const router = express.Router();

// Apply auth middleware to all loyalty routes
router.use(supabaseAuth);

// Get transaction history
router.get('/history', getHistory);

export default router;
