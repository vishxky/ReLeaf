const Reward = require('../models/Reward');

const rewards = [
  // Marketplace Rewards
  {
    title: 'Eco-Friendly Water Bottle',
    description: 'Stainless steel insulated water bottle (500ml)',
    type: 'marketplace',
    pointsCost: 200,
    imageUrl: null,
    partnerName: 'EcoStore',
    isActive: true
  },
  {
    title: 'Reusable Shopping Bags Set',
    description: 'Set of 5 organic cotton shopping bags',
    type: 'marketplace',
    pointsCost: 150,
    imageUrl: null,
    partnerName: 'GreenGoods',
    isActive: true
  },
  {
    title: 'Bamboo Cutlery Set',
    description: 'Travel-friendly bamboo cutlery with carrying case',
    type: 'marketplace',
    pointsCost: 180,
    imageUrl: null,
    partnerName: 'EcoStore',
    isActive: true
  },
  {
    title: 'Solar-Powered Phone Charger',
    description: 'Portable solar charger for smartphones',
    type: 'marketplace',
    pointsCost: 400,
    imageUrl: null,
    partnerName: 'SolarTech',
    isActive: true
  },
  {
    title: 'Organic Cotton T-Shirt',
    description: '100% organic cotton eco-friendly t-shirt',
    type: 'marketplace',
    pointsCost: 250,
    imageUrl: null,
    partnerName: 'EcoWear',
    isActive: true
  },

  // Donation Rewards
  {
    title: 'Plant 10 Trees',
    description: 'Donate to plant 10 trees in deforested areas',
    type: 'donation',
    pointsCost: 300,
    imageUrl: null,
    partnerName: 'Trees for Future',
    isActive: true
  },
  {
    title: 'Ocean Cleanup Donation',
    description: 'Support ocean plastic cleanup efforts',
    type: 'donation',
    pointsCost: 250,
    imageUrl: null,
    partnerName: 'Ocean Conservancy',
    isActive: true
  },
  {
    title: 'Wildlife Conservation Fund',
    description: 'Contribute to endangered species protection',
    type: 'donation',
    pointsCost: 350,
    imageUrl: null,
    partnerName: 'Wildlife Fund',
    isActive: true
  },
  {
    title: 'Renewable Energy Project',
    description: 'Support solar panel installation in developing communities',
    type: 'donation',
    pointsCost: 500,
    imageUrl: null,
    partnerName: 'Solar Aid',
    isActive: true
  },

  // Exclusive Rewards
  {
    title: 'VIP Eco-Tour Experience',
    description: 'Exclusive guided tour of a sustainable farm or eco-resort',
    type: 'exclusive',
    pointsCost: 800,
    imageUrl: null,
    partnerName: 'EcoTours',
    isActive: true
  },
  {
    title: 'Online Sustainability Course',
    description: 'Premium course on sustainable living and zero-waste lifestyle',
    type: 'exclusive',
    pointsCost: 350,
    imageUrl: null,
    partnerName: 'GreenAcademy',
    isActive: true
  },
  {
    title: 'Limited Edition Eco-Kit',
    description: 'Curated box of premium sustainable products',
    type: 'exclusive',
    pointsCost: 600,
    imageUrl: null,
    partnerName: 'EcoBox',
    isActive: true
  }
];

const seedRewards = async () => {
  try {
    await Reward.deleteMany({});
    await Reward.insertMany(rewards);
    console.log('✓ Rewards seeded successfully');
  } catch (error) {
    console.error('Error seeding rewards:', error);
    throw error;
  }
};

module.exports = seedRewards;

