const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
  title: String,
  content: String,
  author: String,
});

router.get('/', async (req, res) => {
  const posts = await Post.find().exec();
  res.json(posts);
});

router.post('/', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

module.exports = router;