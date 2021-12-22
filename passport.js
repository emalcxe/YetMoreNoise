const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const Users = require('./users')

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});
passport.use(
    new SpotifyStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: (process.env.URL || 'http://localhost:') + (process.env.PORT || 8080) + '/auth/spotify/callback',
        },
        function (accessToken, refreshToken, expires_in, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                Users.get(profile.id).then((doc)=>{
                    doc["profile"] = profile;
                    doc["access_token"] = accessToken;
                    doc["refresh_token"] = refreshToken;
                    doc["expiration"] = Date.now() + (expires_in*1000);
                    doc["time"] = Date.now();
                    Users.put(doc);
                }).catch((err)=>{
                    console.log(err)
                    if(err.reason === 'missing'){
                        console.log("Populating User")
                        doc = {
                            "_id" : profile.id,
                            "name" : profile.id,
                            "profile" : profile,
                            "access_token" : accessToken,
                            "refresh_token" : refreshToken
                        }
                        Users.put(doc).catch((err) => {
                            console.log(err)
                        })
                    }
                })

                return done(null, profile);
            });
        }
    )
);
