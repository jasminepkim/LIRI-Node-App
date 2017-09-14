// LOAD KEYS & NPM PACKAGES REQUIRED
// var fs = require('fs');
var keys = require('./keys.js'); //to import keys.js
var request = require('request');
var twitter = require('twitter'); //refer to package.json naming
var moment = require('moment'); //for twitter api
var spotify = require('node-spotify-api');
var fs = require('fs');

// TWITTER
if (process.argv[2] === 'my-tweets') {
    // console.log(keys);
    var client = new twitter(keys);
    var params = {
        screen_name: 'jasmineCanTweet',
        // to limit the max return of tweets
        count: 20,
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        // if error then throw error
        if (error) throw error;
        // if not error, then...
        if (!error) {
            // loop through the tweets and its length and return them
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                // to add timestamps of tweets
                console.log(moment(tweets[i].created_at, "ddd MMM D HH:mm:ss ZZ YYYY").format("MMMM D, YYYY; h:mm a"));
            }
        }
    });
// SPOTIFY
} else if (process.argv[2] === 'spotify-this-song') {
    var spotifySearch = process.argv[3];
    var spotify = new spotify({
        id: '92070267cbd14f06a6d85d5205985941',
        secret: '2d7eea96198b40b3ae0c0b8a7c168777'
    });

    spotify.search({
        type: 'track',
        query: '\'' + spotifySearch + '\'',
        limit: 1,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err); //change to ace of base
        } else {
            var info = data.tracks.items[0];
            console.log('Name of Artist: ' + info.artists[0].name);
            console.log('Name of Song: ' + info.name);
            console.log('Name of Album: ' + info.album.name);
            console.log('Preview song link: ' + info.preview_url);
        }
    });

// OMDB
} else if (process.argv[2] === 'movie-this') {
    console.log('best movie ever');
// FS PACKAGE
} else if (process.argv[2] === 'do-what-it-says') {
    fs.readFile('random.txt', 'utf8', function (err, data){
        if (err) {
            return console.log(err);
        }
        console.log(data);
    })
// NO ARGV[2] INPUT FROM USER
} else {
    console.log('womp womp');
}