let express = require('express');
let router = express.Router();
let spotify = require('../spotify')

/* GET home page. */

router.get('/', function(req, res) {
    if(req.user){
        spotify.generateGenres(req.user.id)
    }
    res.render('index', { title: 'Express', user:req.user});
});

module.exports = router;
