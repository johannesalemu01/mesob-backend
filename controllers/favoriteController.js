import Favorite from '../models/favorite.js';
import User from '../models/user.js';

// Get all favorites for the current user
export const getFavorites = async (req, res) => {
  if (!global.isDbConnected) {
    console.log('📡 Serving MOCK favorites (Empty) (DB Offline)');
    return res.status(200).json([]);
  }
  try {
    const supabaseId = req.user.sub;
    const user = await User.findOne({ supabaseId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const favorites = await Favorite.find({ user: user._id })
      .populate('restaurant');
    
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
};

// Add a restaurant to favorites
export const addFavorite = async (req, res) => {
  try {
    const supabaseId = req.user.sub;
    const { restaurantId } = req.body;
    
    const user = await User.findOne({ supabaseId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const favorite = await Favorite.create({
      user: user._id,
      restaurant: restaurantId,
    });

    res.status(201).json(favorite);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Restaurant already in favorites' });
    }
    res.status(500).json({ message: 'Error adding favorite', error: error.message });
  }
};

// Remove a restaurant from favorites
export const removeFavorite = async (req, res) => {
  try {
    const supabaseId = req.user.sub;
    const { restaurantId } = req.params;

    const user = await User.findOne({ supabaseId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const favorite = await Favorite.findOneAndDelete({
      user: user._id,
      restaurant: restaurantId,
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing favorite', error: error.message });
  }
};
