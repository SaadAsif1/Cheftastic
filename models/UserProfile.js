const mongoose = require('mongoose');

// User Schema
const userProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    thumbnail: {
      type: String,
      trim: true,
      default: '',
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    bio: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
); //Created at and Updated at feild automatly generated

module.exports = mongoose.model('User Profile', userProfileSchema);
