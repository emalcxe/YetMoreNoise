const cheerio = require('cheerio');
const axios = require('axios');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

let masterGenres = { map: {}, list: [], x_max:0, x_min: Infinity, y_max:0, y_min: Infinity}

axios.get('https://everynoise.com/').then(resp => {
    let $ = cheerio.load(resp.data);
    $('.genre').each(function (i, e) {
        let genre = $(this)
        let title = genre.text().slice(0,-2)
        let entry =  {
            id: title.replace(/$|_|\^| |-|&/gi,''),
            title: title,
            x: genre.css("left").slice(0,-2),
            y: genre.css("top").slice(0,-2)
        }
        masterGenres.x_max = Math.max(masterGenres.x_max, entry.x)
        masterGenres.x_min = Math.min(masterGenres.x_min, entry.x)
        masterGenres.y_max = Math.max(masterGenres.y_max, entry.y)
        masterGenres.y_min = Math.min(masterGenres.y_min, entry.y)
        masterGenres['map'][entry.id] = entry
        masterGenres['list'][i] = entry
    });
})
module.exports = masterGenres

