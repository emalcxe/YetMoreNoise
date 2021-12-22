let express = require('express');
let router = express.Router();
const passport = require("passport");
require('../passport')
require('dotenv').config();

router.get('/spotify',passport.authenticate('spotify',{
    scope: ['user-top-read'],
    showDialog: true
}));

router.get('/spotify/callback',passport.authenticate('spotify', { failureRedirect: '/auth/error' }),
    function(req, res) {
        res.redirect('/');
    });

router.get('/spotify/refresh',(req,res)=>{

});

router.get('/logout', (req, res) => {
    req.user = null;
    req.logout();
    res.redirect('/');
});

module.exports = router;