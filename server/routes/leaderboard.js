const express = require('express');
const router = express.Router();
const { getGlobalLeaderboard, getUserRank } = require('../controllers/leaderboardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/global', getGlobalLeaderboard);
router.get('/rank/:userId', protect, getUserRank);

module.exports = router;
