const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middle/auth')
const spotify = require('../spotify')
/* GET home page. */
router.get('/', isLoggedIn, (req, res) => {
  spotify.generateGenres(req.user.id)
  res.render('map', { title: 'Yet More Noise', masterGenres: spotify.masterGenres, topGenres:spotify.topGenres });
});

module.exports = router;
