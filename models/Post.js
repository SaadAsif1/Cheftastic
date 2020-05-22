const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User Profile',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postText: {
      type: String,
      required: true,
      trim: true,
    },
    comments: [
      {
        commentText: {
          type: String,
          trim: true,
        },
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User Profile',
        },
        date: {
          type: String,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Posts', postSchema);
