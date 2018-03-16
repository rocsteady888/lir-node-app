

require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");

var action = process.argv[2];
var value = process.argv.slice(3).toString();

switch (action) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotifyThis();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doIt();
    break;
}

 // this will store the results of a search
const textFile = `log.txt`;

// Removing all the commas from the string
var stringValue = value.replace(/[, ]+/g, " ").trim();

// Capitalizing the first letter in each word
function toUpper(str) {
  return str
      .toLowerCase()
      .split(' ')
      .map(function(word) {
          return word[0].toUpperCase() + word.substr(1);
      })
      .join(' ');
   }

// Spotify //
function spotifyThis() {
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);
  // Setting the value if none is placed
  if (value.length === 0) {
    value = `Let it Be`;
    stringValue = value;
  }
    spotify.search({ type: 'track', query: value}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      for (var i = 0; i < 1; i++) {
        // Parsing and arranging the requested data in a reader friendly form, and then logging to log.txt file
        var artist = `The artist is ` + data.tracks.items[i].album.artists[0].name + `\r\n`;
        var track = `The name of the track is ` + data.tracks.items[i].name + `\r\n`;
        var album = `The track appears on the album ` + data.tracks.items[i].album.name + `\r\n`;
        var preview = `Preview the song: ` + data.tracks.items[i].preview_url + `\r\n`  + `\r\n`;
        console.log(artist + track + album + preview);
        fs.appendFile(textFile, (action + `, ` + toUpper(stringValue) + `\r\n`+ artist + track + album + preview), function(err) {
          console.log(err || 'Content logged!');
        });
      }
    });

}

// Twitter //
function myTweets() {

  var Twitter = require('twitter');
  var client = new Twitter(keys.twitter);
  var params = {screen_name: value.toString()};
  // for my dummy twitter the value should be: ryan_oconnor
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < 20; i++) {
      // console.log(tweets[i]);
      // Parsing and arranging the requested data in a reader friendly form, and then logging to log.txt file
      console.log(`On ` + tweets[i].created_at + `, ` + tweets[i].user.name + ` tweeted ` + `"` + tweets[i].text +`"`);
      fs.appendFile(textFile, (action + `, ` + toUpper(stringValue) + `\r\n` + `On ` + tweets[i].created_at + `, ` + tweets[i].user.name + ` tweeted ` + `"` + tweets[i].text +`"` + `\r\n`  + `\r\n`), function(err) {
        console.log(err || 'Content logged!');
      });
    }
  }
  });
}

//  OMDB //
function movieThis() {
  const request = require('request');
  if (value.length === 0) {
    value = `Mr. Nobody`;
    stringValue = value;
  }
  // Run a request to the OMDB API with the movie specified
  request(`http://www.omdbapi.com/?t=${value}&y=&plot=short&apikey=trilogy`, function(e, r, b) {

    if (!e && r.statusCode === 200) {
      // console.log(b);
      var movieTitle = `${JSON.parse(b).Title}`;
      var movieName = `The name of the movie is ` + movieTitle + `\r\n`;
      var yearReleased = movieTitle + ` was released ${JSON.parse(b).Released}` + `\r\n`
      var imdbScore = movieTitle + ` has an IMDB rating of ${JSON.parse(b).imdbRating}` + `\r\n`;
      var rottenScore = movieTitle + ` has a ${JSON.parse(b).Ratings[1].Source} rating of ${JSON.parse(b).Ratings[1].Value}` + `\r\n`;
      var produced = movieTitle + ` was produced in ${JSON.parse(b).Country}` + `\r\n`;
      var language = movieTitle + ` is in the ${JSON.parse(b).Language} language` + `\r\n`;
      var plot = `The plot of ` + movieTitle + ` is as follows: ${JSON.parse(b).Plot}` + `\r\n`;
      var actors = movieTitle + ` stars the actors ${JSON.parse(b).Actors}` + `\r\n` + `\r\n`;
      console.log(movieName + yearReleased + imdbScore + rottenScore + produced + language + plot + actors);
      fs.appendFile(textFile, (action + `, ` + toUpper(stringValue) + `\r\n`+ movieName + yearReleased + imdbScore + rottenScore + produced + language + plot + actors), function(err) {
        console.log(err || 'Content logged!');
      });

    }
  });
}

// //  do what it says //
function doIt() {
  // Stores read info into "data"
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var output = data.split(",");
    for (var i = 0; i < 1; i++) {
      action = output[0];
      value = output[1];

      switch (action) {
        case "my-tweets":
          myTweets();
          break;

        case "spotify-this-song":
          spotifyThis();
          break;

        case "movie-this":
          movieThis();
          break;

        case "do-what-it-says":
          doIt();
          break;
      }
    }
  });
}
