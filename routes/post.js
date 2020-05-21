const express = require('express');
const router = express.Router();
const { requireSignin } = require('../middleware/auth');

// Import controllers
const {
  getSingalPost,
  getAllPost,
  getAllAccountPost,
  createPost,
  updatePost,
  deletePost,
  commentPost,
  deleteComment,
} = require('../controllers/post');

// Get Singal post
router.get('/post/:id', getSingalPost);

// Get All posts
router.get('/posts', getAllPost);

// Get All Account posts
router.get('/account/posts/:id', getAllAccountPost);

// Create a post
router.post('/post', requireSignin, createPost);

// update a post
router.put('/post/:id', requireSignin, updatePost);

// delete a post
router.delete('/post/:id', requireSignin, deletePost);

// Comment on a post
router.post('/post/comment/:id', requireSignin, commentPost);

// Deleting a comment
router.delete('/post/comment/:id', requireSignin, deleteComment);

module.exports = router;
