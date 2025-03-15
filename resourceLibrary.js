const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Resource = mongoose.model('Resource', {
  title: String,
  description: String,
  link: String,
});

router.get('/', async (req, res) => {
  const resources = await Resource.find().exec();
  res.json(resources);
});

router.post('/', async (req, res) => {
  const resource = new Resource(req.body);
  await resource.save();
  res.json(resource);
});

module.exports = router;