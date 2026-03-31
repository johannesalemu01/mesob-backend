import User from '../models/user.js';

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const supabaseId = req.user.sub; // From Supabase JWT
    let user = await User.findOne({ supabaseId });

    if (!user) {
      // If user doesn't exist in MongoDB yet, create from Supabase info
      user = await User.create({
        supabaseId,
        email: req.user.email,
        fullName: req.user.user_metadata?.full_name || '',
        avatarUrl: req.user.user_metadata?.avatar_url || '',
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Update profile info (fullName, phoneNumber, avatarUrl)
export const updateProfile = async (req, res) => {
  try {
    const supabaseId = req.user.sub;
    const { fullName, phoneNumber, avatarUrl } = req.body;

    const user = await User.findOneAndUpdate(
      { supabaseId },
      { $set: { fullName, phoneNumber, avatarUrl } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Update preferences (theme, notifications)
export const updatePreferences = async (req, res) => {
  try {
    const supabaseId = req.user.sub;
    const { theme, notifications } = req.body;

    const updateData = {};
    if (theme) updateData['preferences.theme'] = theme;
    if (notifications) {
      if (notifications.push !== undefined) updateData['preferences.notifications.push'] = notifications.push;
      if (notifications.email !== undefined) updateData['preferences.notifications.email'] = notifications.email;
    }

    const user = await User.findOneAndUpdate(
      { supabaseId },
      { $set: updateData },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating preferences', error: error.message });
  }
};

// Delete account
export const deleteAccount = async (req, res) => {
  try {
    const supabaseId = req.user.sub;
    const user = await User.findOneAndDelete({ supabaseId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Note: This only deletes from MongoDB. Supabase Auth deletion should be handled via a webhook or admin client.
    res.status(200).json({ message: 'User account deleted from database' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account', error: error.message });
  }
};
