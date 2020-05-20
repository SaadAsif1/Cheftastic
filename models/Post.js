const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User Profile',
    },
    postText: {
      type: String,
      required: true,
    },
    comments: [
      {
        commentText: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User Profile',
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Posts', postSchema);
