const express = require('express');
const router = express.Router();
const spotify = require('../spotify')

/* GET home page. */

router.get('/', function(req, res) {
    if(req.user){
        spotify.generateGenres(req.user.id)
    }
    res.render('index',{ title: 'Yet More Noise', signedIn:req.user});
});

module.exports = router;
