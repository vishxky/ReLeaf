const Challenge = require('../models/Challenge');

const challenges = [
  // Daily Challenges
  {
    title: 'Use a Reusable Water Bottle',
    description: 'Drink from a reusable water bottle instead of disposable plastic bottles today.',
    category: 'daily',
    pointsReward: 10,
    iconName: 'Droplet',
    isActive: true
  },
  {
    title: 'Take Public Transport',
    description: 'Use public transportation, bike, or walk instead of driving alone.',
    category: 'daily',
    pointsReward: 15,
    iconName: 'Bus',
    isActive: true
  },
  {
    title: 'Meatless Monday',
    description: 'Go vegetarian for the day to reduce your carbon footprint.',
    category: 'daily',
    pointsReward: 20,
    iconName: 'Carrot',
    isActive: true
  },
  {
    title: 'Turn Off Lights',
    description: 'Turn off all unnecessary lights when leaving a room.',
    category: 'daily',
    pointsReward: 5,
    iconName: 'Lightbulb',
    isActive: true
  },
  {
    title: 'Bring Your Own Bag',
    description: 'Use reusable bags for shopping instead of plastic bags.',
    category: 'daily',
    pointsReward: 10,
    iconName: 'ShoppingBag',
    isActive: true
  },

  // Weekly Challenges
  {
    title: 'Zero Waste Week',
    description: 'Try to produce as little waste as possible for an entire week.',
    category: 'weekly',
    pointsReward: 50,
    iconName: 'Trash2',
    isActive: true
  },
  {
    title: 'Plastic-Free Shopping',
    description: 'Do all your grocery shopping without buying items in plastic packaging.',
    category: 'weekly',
    pointsReward: 40,
    iconName: 'ShoppingCart',
    isActive: true
  },
  {
    title: 'Start Composting',
    description: 'Begin composting your organic waste this week.',
    category: 'weekly',
    pointsReward: 45,
    iconName: 'Leaf',
    isActive: true
  },
  {
    title: 'Energy Audit',
    description: 'Conduct an energy audit of your home and implement 3 energy-saving measures.',
    category: 'weekly',
    pointsReward: 35,
    iconName: 'Zap',
    isActive: true
  },

  // Monthly Challenges
  {
    title: 'Plant a Tree',
    description: 'Plant a tree in your community or donate to a reforestation project.',
    category: 'monthly',
    pointsReward: 100,
    iconName: 'TreePine',
    isActive: true
  },
  {
    title: 'Volunteer for Environmental Cleanup',
    description: 'Participate in a local beach, park, or community cleanup event.',
    category: 'monthly',
    pointsReward: 80,
    iconName: 'Heart',
    isActive: true
  },
  {
    title: 'Switch to Renewable Energy',
    description: 'Switch your home energy plan to a renewable energy provider.',
    category: 'monthly',
    pointsReward: 150,
    iconName: 'Wind',
    isActive: true
  },
  {
    title: 'Educate & Inspire',
    description: 'Organize or attend an environmental awareness event in your community.',
    category: 'monthly',
    pointsReward: 90,
    iconName: 'Users',
    isActive: true
  }
];

const seedChallenges = async () => {
  try {
    await Challenge.deleteMany({});
    await Challenge.insertMany(challenges);
    console.log('✓ Challenges seeded successfully');
  } catch (error) {
    console.error('Error seeding challenges:', error);
    throw error;
  }
};

module.exports = seedChallenges;

