const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

// GET all shortened URLs
router.get('/api/urls', async (req, res) => {
  try {
    const urls = await Url.find().sort({ date: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a specific short URL by code
router.get('/api/urls/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    if (!url) return res.status(404).json({ error: 'Not found' });
    res.json(url);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE a specific short URL (update long URL or expiration)
router.put('/api/urls/:code', async (req, res) => {
  try {
    const updated = await Url.findOneAndUpdate(
      { shortCode: req.params.code },
      {
        longUrl: req.body.longUrl,
        expiresAt: req.body.expiresAt
          ? new Date(req.body.expiresAt)
          : undefined
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a specific short URL
router.delete('/api/urls/:code', async (req, res) => {
  try {
    const deleted = await Url.findOneAndDelete({ shortCode: req.params.code });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
