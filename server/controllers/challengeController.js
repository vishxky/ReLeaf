const Challenge = require('../models/Challenge');
const UserChallenge = require('../models/UserChallenge');
const Profile = require('../models/Profile');

// @desc    Get all challenges with user progress
// @route   GET /api/challenges
// @access  Private
const getChallenges = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get all active challenges
    const challenges = await Challenge.find({ isActive: true }).sort({ createdAt: -1 });

    // Get user's challenge progress
    const userChallenges = await UserChallenge.find({ userId });

    // Map user challenges to challenges
    const challengesWithProgress = challenges.map(challenge => {
      const userChallenge = userChallenges.find(
        uc => uc.challengeId.toString() === challenge._id.toString()
      );

      return {
        id: challenge._id,
        title: challenge.title,
        description: challenge.description,
        category: challenge.category,
        pointsReward: challenge.pointsReward,
        iconName: challenge.iconName,
        createdAt: challenge.createdAt,
        userChallenge: userChallenge ? {
          id: userChallenge._id,
          status: userChallenge.status,
          startedAt: userChallenge.startedAt,
          completedAt: userChallenge.completedAt,
          proofData: userChallenge.proofData
        } : null
      };
    });

    res.json({
      success: true,
      challenges: challengesWithProgress
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single challenge
// @route   GET /api/challenges/:id
// @access  Private
const getChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Get user's progress on this challenge
    const userChallenge = await UserChallenge.findOne({
      userId: req.user._id,
      challengeId: challenge._id
    });

    res.json({
      success: true,
      challenge: {
        id: challenge._id,
        title: challenge.title,
        description: challenge.description,
        category: challenge.category,
        pointsReward: challenge.pointsReward,
        iconName: challenge.iconName,
        createdAt: challenge.createdAt,
        userChallenge: userChallenge ? {
          id: userChallenge._id,
          status: userChallenge.status,
          startedAt: userChallenge.startedAt,
          completedAt: userChallenge.completedAt,
          proofData: userChallenge.proofData
        } : null
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Start a challenge
// @route   POST /api/challenges/:id/start
// @access  Private
const startChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (!challenge.isActive) {
      return res.status(400).json({ message: 'Challenge is not active' });
    }

    // Check if user already started this challenge
    const existingUserChallenge = await UserChallenge.findOne({
      userId: req.user._id,
      challengeId: challenge._id
    });

    if (existingUserChallenge) {
      return res.status(400).json({ message: 'Challenge already started' });
    }

    // Create user challenge
    const userChallenge = await UserChallenge.create({
      userId: req.user._id,
      challengeId: challenge._id,
      status: 'in_progress',
      startedAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Challenge started successfully',
      userChallenge: {
        id: userChallenge._id,
        status: userChallenge.status,
        startedAt: userChallenge.startedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete a challenge
// @route   PUT /api/challenges/:id/complete
// @access  Private
const completeChallenge = async (req, res, next) => {
  try {
    const { proofData } = req.body;

    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Find user's challenge
    const userChallenge = await UserChallenge.findOne({
      userId: req.user._id,
      challengeId: challenge._id
    });

    if (!userChallenge) {
      return res.status(404).json({ message: 'You have not started this challenge' });
    }

    if (userChallenge.status === 'completed' || userChallenge.status === 'verified') {
      return res.status(400).json({ message: 'Challenge already completed' });
    }

    // Update challenge status
    userChallenge.status = 'completed';
    userChallenge.completedAt = new Date();
    if (proofData) {
      userChallenge.proofData = proofData;
    }
    await userChallenge.save();

    // Award points to user profile
    const profile = await Profile.findOne({ userId: req.user._id });
    if (profile) {
      profile.points += challenge.pointsReward;
      await profile.save();
    }

    res.json({
      success: true,
      message: `Challenge completed! You earned ${challenge.pointsReward} points`,
      userChallenge: {
        id: userChallenge._id,
        status: userChallenge.status,
        completedAt: userChallenge.completedAt
      },
      pointsEarned: challenge.pointsReward,
      newTotalPoints: profile ? profile.points : 0
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getChallenges,
  getChallenge,
  startChallenge,
  completeChallenge
};

