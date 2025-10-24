require('dotenv').config();
const connectDB = require('../config/db');
const seedChallenges = require('./challengeSeeder');
const seedRewards = require('./rewardSeeder');
const seedCommunityPosts = require('./communitySeeder');

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();

    console.log('\nSeeding database...');
    await seedChallenges();
    await seedRewards();
    await seedCommunityPosts();

    console.log('\n✓ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

