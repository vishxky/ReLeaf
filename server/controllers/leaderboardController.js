const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Get global leaderboard
// @route   GET /api/leaderboard/global
// @access  Public
const getGlobalLeaderboard = async (req, res, next) => {
  try {
    const { limit = 50, timeframe = 'alltime' } = req.query;

    // Get profiles sorted by points, populate user email for username
    const profiles = await Profile.find()
      .populate('userId', 'email createdAt')
      .sort({ points: -1 })
      .limit(parseInt(limit));

    // Format leaderboard data
    const leaderboard = profiles.map((profile, index) => ({
      rank: index + 1,
      userId: profile.userId._id,
      name: profile.name || profile.userId.email.split('@')[0],
      username: profile.userId.email.split('@')[0],
      email: profile.userId.email,
      points: profile.points,
      loginStreak: profile.loginStreak,
      joinedDate: profile.userId.createdAt
    }));

    res.json({
      success: true,
      leaderboard,
      totalUsers: leaderboard.length
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's rank
// @route   GET /api/leaderboard/rank/:userId
// @access  Private
const getUserRank = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Get user's profile
    const userProfile = await Profile.findOne({ userId });
    if (!userProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Count profiles with more points
    const rank = await Profile.countDocuments({
      points: { $gt: userProfile.points }
    }) + 1;

    res.json({
      success: true,
      rank,
      points: userProfile.points
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGlobalLeaderboard,
  getUserRank
};
