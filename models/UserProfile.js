const mongoose = require('mongoose');

// User Schema
const userProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      trim: true,
      default: '',
    },
    thumbnail: {
      type: String,
      trim: true,
      default: 'rgb(75, 91, 121)',
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
