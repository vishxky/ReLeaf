const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Reward title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  type: {
    type: String,
    enum: ['marketplace', 'donation', 'exclusive', 'badge'],
    required: [true, 'Reward type is required']
  },
  pointsCost: {
    type: Number,
    required: [true, 'Points cost is required'],
    min: 0
  },
  imageUrl: {
    type: String,
    default: null
  },
  partnerName: {
    type: String,
    default: null
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

module.exports = mongoose.model('Reward', rewardSchema);

