const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  toggleLike,
  deletePost
} = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');

router.get('/posts', getPosts);
router.post('/posts', protect, createPost);
router.post('/posts/:id/like', protect, toggleLike);
router.delete('/posts/:id', protect, deletePost);

module.exports = router;
