const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Challenge title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  category: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: [true, 'Category is required']
  },
  pointsReward: {
    type: Number,
    required: [true, 'Points reward is required'],
    min: 0,
    default: 10
  },
  iconName: {
    type: String,
    default: 'Leaf'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Challenge', challengeSchema);

