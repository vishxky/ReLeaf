const CommunityPost = require('../models/CommunityPost');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { cleanProfanity } = require('../utils/profanityFilter');

// @desc    Get all community posts
// @route   GET /api/community/posts
// @access  Public
const getPosts = async (req, res, next) => {
  try {
    const { limit = 20, skip = 0 } = req.query;

    // Get pinned posts first (sorted by creation date desc), then non-pinned posts
    const pinnedPosts = await CommunityPost.find({ isPinned: true })
      .populate('userId', 'email')
      .sort({ createdAt: -1 });

    const regularPosts = await CommunityPost.find({ isPinned: { $ne: true } })
      .populate('userId', 'email')
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit) - pinnedPosts.length);

    // Combine posts: pinned first, then regular posts
    const allPosts = [...pinnedPosts, ...regularPosts];

    // Get profile info for each post
    const postsWithProfiles = await Promise.all(
      allPosts.map(async (post) => {
        const profile = await Profile.findOne({ userId: post.userId._id });
        return {
          id: post._id,
          content: post.content,
          likes: post.likes.length,
          comments: post.comments.length,
          isDemo: post.isDemo,
          isPinned: post.isPinned,
          createdAt: post.createdAt,
          author: {
            id: post.userId._id,
            name: profile?.name || post.userId.email.split('@')[0],
            username: post.userId.email.split('@')[0]
          }
        };
      })
    );

    res.json({
      success: true,
      posts: postsWithProfiles,
      total: postsWithProfiles.length
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new post
// @route   POST /api/community/posts
// @access  Private
const createPost = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Post content is required' });
    }

    if (content.length > 1000) {
      return res.status(400).json({ message: 'Post content cannot exceed 1000 characters' });
    }

    // Check 12-hour post timeout
    const user = await User.findById(req.user._id);
    if (user.lastPostTime) {
      const lastPostTime = new Date(user.lastPostTime);
      const now = new Date();
      const timeDiff = now.getTime() - lastPostTime.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      if (hoursDiff < 12) {
        const remainingHours = Math.ceil(12 - hoursDiff);
        return res.status(429).json({
          message: `You can only post once every 12 hours. Please wait ${remainingHours} more hour${remainingHours > 1 ? 's' : ''} before posting again.`
        });
      }
    }

    // Clean profanity from content (replace with ***)
    const cleanedContent = cleanProfanity(content.trim());

    const post = await CommunityPost.create({
      userId: req.user._id,
      content: cleanedContent,
      isDemo: false
    });

    // Update user's last post time
    await User.findByIdAndUpdate(req.user._id, { lastPostTime: new Date() });

    const profile = await Profile.findOne({ userId: req.user._id });

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: {
        id: post._id,
        content: post.content,
        likes: 0,
        comments: 0,
        isDemo: false,
        isPinned: false,
        createdAt: post.createdAt,
        author: {
          id: req.user._id,
          name: profile?.name || req.user.email.split('@')[0],
          username: req.user.email.split('@')[0]
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like/Unlike a post
// @route   POST /api/community/posts/:id/like
// @access  Private
const toggleLike = async (req, res, next) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userIndex = post.likes.indexOf(req.user._id);

    if (userIndex > -1) {
      // Unlike
      post.likes.splice(userIndex, 1);
    } else {
      // Like
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json({
      success: true,
      liked: userIndex === -1,
      likesCount: post.likes.length
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a post
// @route   DELETE /api/community/posts/:id
// @access  Private
const deletePost = async (req, res, next) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user owns the post
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    // Don't allow deleting demo posts
    if (post.isDemo) {
      return res.status(403).json({ message: 'Cannot delete demo posts' });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  createPost,
  toggleLike,
  deletePost
};
