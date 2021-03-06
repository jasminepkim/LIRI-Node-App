// LOAD KEYS & REQUIRED NPM PACKAGES

// to import keys.js
var keys = require('./keys.js'); 
var request = require('request');
var twitter = require('twitter'); 
// for Twitter API
var moment = require('moment'); 
var spotify = require('node-spotify-api');
var fs = require('fs');

var command = process.argv[2];
var input = process.argv[3];

// TWITTER
if (command === 'my-tweets') {
    var client = new twitter(keys);
    var params = {
        screen_name: 'jasmineCanTweet',
        // to limit the max return of tweets
        count: 20,
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) throw error;

        if (!error) {
            // loop through the tweets and its length and return them
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                // to "prettify" timestamps with moment.js
                console.log(moment(tweets[i].created_at,
                    "ddd MMM D HH:mm:ss ZZ YYYY").format("MMMM D, YYYY; h:mm a"));
            }
        }
    });

    // SPOTIFY
} else if (command === 'spotify-this-song') {

    // When the user does not input a track after the command,
    // it will return data for "The Sign" by Ace of Base
    if (!input) {
        spotifySearch = 'The Sign';
    } else {
        spotifySearch = command;
    }

    var spotify = new spotify({
        id: '92070267cbd14f06a6d85d5205985941',
        secret: '2d7eea96198b40b3ae0c0b8a7c168777',
    });

    spotify.search({
        type: 'track',
        query: '\'' + spotifySearch + '\'',
        limit: 20
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            // to print all 20 results
            data.tracks.items.forEach(function (info) {
                console.log('Artist: ' + info.artists[0].name);
                console.log('Song: ' + info.name);
                console.log('Album: ' + info.album.name);
                console.log('Preview song link: ' + info.preview_url);
            });
        }
    });

    // OMDB
} else if (command === 'movie-this') {
    var movieName = input;

    // When the user does not input a movie after the command,
    // it will return data for the movie "Mr. Nobody"
    if (!input) {
        movieName = 'Mr Nobody';
    } else {
        movieName = command;
    }

    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece",
        function (error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log('Title: ' + JSON.parse(body).Title);
                console.log('Year: ' + JSON.parse(body).Year);
                console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
                // the Rotten Tomatoes ratings were embedded within an array with an index of 1
                // within the entire "body" object
                console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
                console.log('Country: ' + JSON.parse(body).Country);
                console.log('Language: ' + JSON.parse(body).Language);
                console.log('Plot: ' + JSON.parse(body).Plot);
                console.log('Actors: ' + JSON.parse(body).Actors);
            } else if (error) {
                return console.log('Error occurred: ' + error);
            }
        });

    // FS PACKAGE
} else if (command === 'do-what-it-says') {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    })
    
    // NO ARGV[2] INPUT FROM USER
} else {
    console.log('Please enter a command!');
}