require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dataRoutes = require('./routes/data');
const path = require('path');

const shortenRoutes = require('./routes/shorten');
const redirectRoutes = require('./routes/redirect');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/', redirectRoutes);
app.use('/', shortenRoutes);
app.use('/', dataRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
