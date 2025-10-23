const Reward = require('../models/Reward');
const Profile = require('../models/Profile');

// @desc    Get all active rewards
// @route   GET /api/rewards
// @access  Private
const getRewards = async (req, res, next) => {
  try {
    const rewards = await Reward.find({ isActive: true }).sort({ pointsCost: 1 });

    res.json({
      success: true,
      rewards: rewards.map(reward => ({
        id: reward._id,
        title: reward.title,
        description: reward.description,
        type: reward.type,
        pointsCost: reward.pointsCost,
        imageUrl: reward.imageUrl,
        partnerName: reward.partnerName,
        createdAt: reward.createdAt
      }))
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Redeem a reward
// @route   POST /api/rewards/:id/redeem
// @access  Private
const redeemReward = async (req, res, next) => {
  try {
    const reward = await Reward.findById(req.params.id);

    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }

    if (!reward.isActive) {
      return res.status(400).json({ message: 'Reward is not available' });
    }

    // Get user profile
    const profile = await Profile.findOne({ userId: req.user._id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Check if user has enough points
    if (profile.points < reward.pointsCost) {
      return res.status(400).json({
        message: 'Insufficient points',
        required: reward.pointsCost,
        current: profile.points
      });
    }

    // Deduct points
    profile.points -= reward.pointsCost;
    await profile.save();

    // In a real app, you would create a redemption record here
    // and potentially send the reward to the user

    res.json({
      success: true,
      message: `Successfully redeemed ${reward.title}`,
      pointsSpent: reward.pointsCost,
      remainingPoints: profile.points
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRewards,
  redeemReward
};

