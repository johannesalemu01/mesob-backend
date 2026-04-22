import LoyaltyTransaction from '../models/loyaltyTransaction.js';
import User from '../models/user.js';
import { mockTransactions } from '../utils/mockData.js';

// Get loyalty points history for the current user
export const getHistory = async (req, res) => {
  if (!global.isDbConnected) {
    console.log('📡 Serving MOCK loyalty history (DB Offline)');
    return res.status(200).json(mockTransactions);
  }

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
