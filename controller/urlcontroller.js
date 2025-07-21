const Url = require('../models/Url');
const generateShortCode = require('../util/generator');

exports.showHomePage = async (req, res) => {
  const urls = await Url.find().sort({ date: -1 }).limit(10);
  res.render('index', { urls });
};

exports.createShortUrl = async (req, res) => {
  const { longUrl, customCode } = req.body;

  if (!longUrl) return res.status(400).send('Missing long URL');

  let code = customCode || generateShortCode();
  const existing = await Url.findOne({ shortCode: code });

  if (existing) return res.status(409).send('Custom code already in use');

  const shortUrl = `${process.env.BASE_URL}/${code}`;

  const url = new Url({
    shortCode: code,
    longUrl,
    shortUrl,
    date: new Date()
  });

  await url.save();
  res.redirect('/');
};

exports.handleRedirect = async (req, res) => {
  const { shortCode } = req.params;
  const url = await Url.findOne({ shortCode });

  if (url) {
    return res.redirect(url.longUrl);
  } else {
    return res.status(404).send('URL not found');
  }
};