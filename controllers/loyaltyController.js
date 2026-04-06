import LoyaltyTransaction from '../models/loyaltyTransaction.js';
import User from '../models/user.js';

// Get loyalty points history for the current user
export const getHistory = async (req, res) => {
  try {
    const supabaseId = req.user.sub;
    
    // Find all transactions for this user
    const transactions = await LoyaltyTransaction.find({ supabaseId })
      .sort({ createdAt: -1 }) // Newest first
      .limit(50); // Limit to last 50 transactions for performance
      
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loyalty history', error: error.message });
  }
};
