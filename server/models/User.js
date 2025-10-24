const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  lastLogin: {
    type: Date,
    default: null
  },
  loginStreak: {
    type: Number,
    default: 0
  },
  lastPostTime: {
    type: Date,
    default: null
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to update login streak
userSchema.methods.updateLoginStreak = function() {
  const now = new Date();
  const lastLogin = this.lastLogin;

  if (!lastLogin) {
    // First login
    this.loginStreak = 1;
  } else {
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    if (lastLogin > oneDayAgo) {
      // Already logged in today, don't change streak
      return;
    } else if (lastLogin > twoDaysAgo) {
      // Logged in yesterday, increment streak
      this.loginStreak += 1;
    } else {
      // Missed a day, reset streak
      this.loginStreak = 1;
    }
  }

  this.lastLogin = now;
};

module.exports = mongoose.model('User', userSchema);

