const Url = require('../models/Url');
const shortid = require('shortid');

// Showing the home page with the list of recently shortened URLs
exports.showHomePage = async (req, res) => {
  const urls = await Url.find().sort({ date: -1 }).limit(10);
  res.render('index', { urls });
};

// Creating a short URL
exports.createShortUrl = async (req, res) => {
  const { longUrl, customCode } = req.body;
  const expirationHours = parseInt(req.body.expirationHours) || 24;

  if (!longUrl) return res.status(400).send('Missing long URL');

  let code = customCode || shortid.generate();
  const existing = await Url.findOne({ shortCode: code });

  if (existing) return res.status(409).send('Custom code already in use');

  const shortUrl = `${process.env.BASE_URL}/${code}`;
  const expiresAt = new Date(Date.now() + expirationHours * 60 * 60 * 1000);

  const url = new Url({
    shortCode: code,
    longUrl,
    shortUrl,
    expiresAt
  });

  await url.save();
  res.redirect('/');
};

// Handling the redirect from the generated short URLs
exports.handleRedirect = async (req, res) => {
  const { shortCode } = req.params;
  const url = await Url.findOne({ shortCode });

  if (url) {
    return res.redirect(url.longUrl);
  } else {
    return res.status(404).send('URL not found');
  }
};