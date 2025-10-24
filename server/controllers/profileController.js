const Profile = require('../models/Profile');
const { containsProfanity } = require('../utils/profanityFilter');

// @desc    Get user profile
// @route   GET /api/profiles/:userId
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({
      success: true,
      profile: {
        id: profile._id,
        name: profile.name,
        age: profile.age,
        points: profile.points,
        loginStreak: profile.loginStreak,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/profiles/:userId
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    // Check if user is updating their own profile
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    const { name, age } = req.body;

    const profile = await Profile.findOne({ userId: req.params.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Validate name for profanity
    if (name !== undefined && name.trim()) {
      if (containsProfanity(name)) {
        return res.status(400).json({
          message: 'Name contains inappropriate language. Please choose a different name.',
          field: 'name'
        });
      }
      profile.name = name.trim();
    }

    // Update age if provided
    if (age !== undefined) {
      if (age && (age < 1 || age > 150)) {
        return res.status(400).json({ message: 'Age must be between 1 and 150' });
      }
      profile.age = age;
    }

    await profile.save();

    res.json({
      success: true,
      profile: {
        id: profile._id,
        name: profile.name,
        age: profile.age,
        points: profile.points,
        loginStreak: profile.loginStreak,
        updatedAt: profile.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile
};

