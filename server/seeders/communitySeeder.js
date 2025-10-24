const CommunityPost = require('../models/CommunityPost');
const User = require('../models/User');

const demoPosts = [
  {
    content: "Just completed my first zero-waste challenge! Started composting and switched to reusable bags. Small steps make a big difference! 🌱",
    isDemo: true
  },
  {
    content: "Reminder: Every plastic bottle you reuse is one less in the ocean. Let's keep our planet clean! 💙🌊",
    isDemo: true
  },
  {
    content: "Planted 5 trees this weekend with the local community group. Who else is joining the reforestation effort?",
    isDemo: true
  },
  {
    content: "Switched to a bamboo toothbrush and loving it! Small sustainable swaps are the way to go. What's your latest eco-swap?",
    isDemo: true
  },
  {
    content: "Just hit a 30-day login streak! The daily reminders really help keep sustainability top of mind. 💪",
    isDemo: true
  }
];

const seedCommunityPosts = async () => {
  try {
    // Find a demo user or create one
    let demoUser = await User.findOne({ email: 'demo@releaf.com' });

    if (!demoUser) {
      demoUser = await User.create({
        email: 'demo@releaf.com',
        password: 'demo123456' // Will be hashed
      });
    }

    // Delete existing demo posts
    await CommunityPost.deleteMany({ isDemo: true });

    // Create demo posts
    const posts = demoPosts.map(post => ({
      ...post,
      userId: demoUser._id
    }));

    await CommunityPost.insertMany(posts);
    console.log('✓ Community posts seeded successfully');
  } catch (error) {
    console.error('Error seeding community posts:', error);
    throw error;
  }
};

module.exports = seedCommunityPosts;
