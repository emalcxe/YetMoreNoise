const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middle/auth')
const spotify = require('../spotify')
/* GET home page. */
router.get('/', isLoggedIn, (req, res, next) => {
  spotify.generateGenres(req.user.id)
  console.log("!"+JSON.stringify(spotify))
  res.render('map', { title: 'Express', masterGenres: spotify.masterGenres, topGenres:spotify.topGenres });
});

module.exports = router;
