const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortCode: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  date: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('Url', urlSchema);

