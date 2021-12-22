require('dotenv').config();
const Users = require('./User')
const masterGenres = require('./genres')
const SpotifyWebApi = require('spotify-web-api-node');


let spotify = {
    masterGenres: masterGenres,
    topGenres: {}
}
spotify.generateGenres = function(id){
        let topGenres = this.topGenres ? this.topGenres : {};
        const spotifyAPI = new SpotifyWebApi({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            redirectUri: 'http://localhost:'+8000+'/auth/spotify/callback'
        })
        Users.get(id).then((doc)=>{
            console.log(`Got doc for ${doc.name}`)
            if(Date.now()>doc.expire){
                spotifyAPI.setRefreshToken(doc.refresh_token);
                spotifyAPI.refreshAccessToken().then((data)=>{
                    console.log("Refreshing expired token")
                    doc["access_token"] = data.body["access_token"];
                    doc["expire"] = Date.now() +(3600*1000);
                    doc["time"] = Date.now();
                    Users.put(doc)
                })
            }
            spotifyAPI.setAccessToken(doc.access_token);

            spotifyAPI.getMyTopArtists()
                .then(function(data) {
                    let topArtists = data.body.items;
                    for (let artist of topArtists){
                        for (let genre of artist.genres){
                            genre = `${genre.replace(/$|_|\^| |-|&/gi,'')}`;
                            if (!topGenres.hasOwnProperty(genre))
                                topGenres[genre] = 0;
                            topGenres[genre] += 1;
                        }
                    }
                }, function(err) {
                    console.log('Something went wrong!', err);
                });
            this.topGenres = topGenres;
            //
            // spotifyAPI.getMyTopTracks()
            //     .then(function(data) {
            //         let topTracks = data.body.items;
            //         console.log(topTracks);
            //     }, function(err) {
            //         console.log('Something went wrong!', err);
            //     });
        }).catch((err)=>{
            console.log(err)
        })
}

module.exports = spotify