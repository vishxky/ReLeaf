const express = require('express');
const router = express.Router();
const {
  getChallenges,
  getChallenge,
  startChallenge,
  completeChallenge
} = require('../controllers/challengeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getChallenges);
router.get('/:id', protect, getChallenge);
router.post('/:id/start', protect, startChallenge);
router.put('/:id/complete', protect, completeChallenge);

module.exports = router;

