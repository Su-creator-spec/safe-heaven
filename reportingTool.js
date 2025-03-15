const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Report = mongoose.model('Report', {
  type: String,
  description: String,
  author: String,
});

router.post('/', async (req, res) => {
  const report = new Report(req.body);
  await report.save();
  res.json(report);
});

module.exports = router;