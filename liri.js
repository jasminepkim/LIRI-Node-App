var fs = require('fs');
var keys = require('./keys.js'); //to import keys.js
var request = require('request');
var twitter = require('twitter'); //refer to package.json naming


if (process.argv[2] === 'my-tweets') {
    // console.log(keys);
    var client = new twitter (keys);
    var params = {screen_name: 'jasmineCanTweet'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
      }
    });
} else if (process.argv[2] === 'spotify-this-song') {
    console.log('backstreet boys');
} else if (process.argv[2] === 'movie-this') {
    console.log('best movie ever');
} else if (process.argv[2] === 'do-what-it-says') {
    console.log('demanding');
} else {
    console.log('womp womp');
}

// fs.readFile('keys.js', 'utf8', function(err, data) {
//     if (err) {
//         return consolelog(err);
//     }

// var output = data.split(',');
// console.log(output);

// });