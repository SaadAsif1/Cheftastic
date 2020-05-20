const mongoose = require('mongoose');
const { postValidation, commentValidation } = require('../validators/post');
const Post = require('../models/Post');
const UserProfile = require('../models/UserProfile');

// GET SIGNAL POST
exports.getSingalPost = async (req, res) => {
  // Check Object ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ObjectId!' });
  }

  const post = await Post.findOne({ _id: req.params.id }).populate('postedBy');

  if (!post) return res.status(400).json({ error: 'No post found!' });

  res.json({ post });
};

// GET ALL POSTS
exports.getAllPost = async (req, res) => {
  const posts = await Post.find({}).populate('postedBy');

  res.json({ posts });
};

// GET ALL ACCOUNTS POSTS
exports.getAllAccountPost = async (req, res) => {
  // Check Object ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ObjectId!' });
  }

  const posts = await Post.find({ postedBy: req.params.id });

  if (!posts) return res.status(400).json({ error: 'No Account found!' });

  res.json({ posts });
};

// CREATE A POST
exports.createPost = async (req, res) => {
  // get logged in user
  const user = await UserProfile.findOne({ user: req.user._id });

  // Validate Incoming body request
  const { error, value } = postValidation(req.body);

  // If error with request
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { title, postText } = value;

  const post = new Post({
    title,
    postText,
    postedBy: user,
  });

  const result = await post.save();

  result.populate('postedBy');

  res.json({ message: 'Post succfully created!', result });
};

// UPDATE A POST
exports.updatePost = async (req, res) => {
  // Check Object ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ObjectId!' });
  }

  // get logged in user
  const user = await UserProfile.findOne({ user: req.user._id });

  const post = await Post.findOne({ _id: req.params.id });

  const { title, postText } = req.body;

  if (!post) return res.status(400).json({ error: 'No post found!' });

  if (post.postedBy.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'Only update your posts!' });
  }

  if (title) post.title = title;

  if (postText) post.postText = postText;

  const result = await post.save();

  res.json({ message: 'Succfuly updated post!', result });
};

// DELETE A POST
exports.deletePost = async (req, res) => {
  // Check Object ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ObjectId!' });
  }

  // get logged in user
  const user = await UserProfile.findOne({ user: req.user._id });

  const post = await Post.findOne({ _id: req.params.id });

  if (!post) return res.status(400).json({ error: 'No post found!' });

  if (post.postedBy.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'Only delete  your posts!' });
  }

  Post.deleteMany({ _id: req.params.id }, function (err, result) {
    if (result.deletedCount === 0) {
      res.status(400).json({ error: "Can't find post!" });
    } else {
      res.json({ message: 'Succfully deleted post!' });
    }
  });
};

exports.commentPost = async (req, res) => {
  // Check Object ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ObjectId!' });
  }

  // get logged in user
  const user = await UserProfile.findOne({ user: req.user._id });

  // Get post
  const post = await Post.findOne({ _id: req.params.id });

  // No post found
  if (!post) return res.status(400).json({ error: 'No Post found!' });

  // Validate Incoming body request
  const { error, value } = commentValidation(req.body);

  // If error with request
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { commentText } = value;

  const comment = { commentText, postedBy: user };

  post.comments.push(comment);

  const result = await post.save();

  result.populate('comments');

  res.json(result);
};

// exports.deleteComment = async (req, res) => {};
