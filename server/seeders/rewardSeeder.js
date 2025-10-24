const Reward = require('../models/Reward');

const rewards = [
  // Marketplace Rewards
  {
    title: 'Eco-Friendly Water Bottle',
    description: 'Stainless steel insulated water bottle (500ml)',
    type: 'marketplace',
    pointsCost: 200,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    partnerName: 'EcoStore',
    isActive: true
  },
  {
    title: 'Reusable Shopping Bags Set',
    description: 'Set of 5 organic cotton shopping bags',
    type: 'marketplace',
    pointsCost: 150,
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
    partnerName: 'GreenGoods',
    isActive: true
  },
  {
    title: 'Bamboo Cutlery Set',
    description: 'Travel-friendly bamboo cutlery with carrying case',
    type: 'marketplace',
    pointsCost: 180,
    imageUrl: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=400&h=400&fit=crop',
    partnerName: 'EcoStore',
    isActive: true
  },
  {
    title: 'Solar-Powered Phone Charger',
    description: 'Portable solar charger for smartphones',
    type: 'marketplace',
    pointsCost: 400,
    imageUrl: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=400&h=400&fit=crop',
    partnerName: 'SolarTech',
    isActive: true
  },
  {
    title: 'Organic Cotton T-Shirt',
    description: '100% organic cotton eco-friendly t-shirt',
    type: 'marketplace',
    pointsCost: 250,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    partnerName: 'EcoWear',
    isActive: true
  },

  // Donation Rewards
  {
    title: 'Plant 10 Trees',
    description: 'Donate to plant 10 trees in deforested areas',
    type: 'donation',
    pointsCost: 300,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop',
    partnerName: 'Trees for Future',
    isActive: true
  },
  {
    title: 'Ocean Cleanup Donation',
    description: 'Support ocean plastic cleanup efforts',
    type: 'donation',
    pointsCost: 250,
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop',
    partnerName: 'Ocean Conservancy',
    isActive: true
  },
  {
    title: 'Wildlife Conservation Fund',
    description: 'Contribute to endangered species protection',
    type: 'donation',
    pointsCost: 350,
    imageUrl: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=400&fit=crop',
    partnerName: 'Wildlife Fund',
    isActive: true
  },
  {
    title: 'Renewable Energy Project',
    description: 'Support solar panel installation in developing communities',
    type: 'donation',
    pointsCost: 500,
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop',
    partnerName: 'Solar Aid',
    isActive: true
  },

  // Exclusive Rewards
  {
    title: 'VIP Eco-Tour Experience',
    description: 'Exclusive guided tour of a sustainable farm or eco-resort',
    type: 'exclusive',
    pointsCost: 800,
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop',
    partnerName: 'EcoTours',
    isActive: true
  },
  {
    title: 'Online Sustainability Course',
    description: 'Premium course on sustainable living and zero-waste lifestyle',
    type: 'exclusive',
    pointsCost: 350,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
    partnerName: 'GreenAcademy',
    isActive: true
  },
  {
    title: 'Limited Edition Eco-Kit',
    description: 'Curated box of premium sustainable products',
    type: 'exclusive',
    pointsCost: 600,
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop',
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

