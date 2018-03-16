# LIRI-NODE-APP
  Node JS, 
  APIs
  
### Overview

SIRI's cousin, LIRI has come to the terminal!!!  LIRI isn't as smart as her iOS counterpart but she can pull up your tweets, search spotify API, the OMDB API, or pull from a random txt file!!

In order to use this app you would need to visit twitter and spotify to obtain your own API keys.  It's free and easy...

   * [Twitter](https://www.npmjs.com/package/twitter)
   
   * [Spotify](https://www.npmjs.com/package/node-spotify-api)

   * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).

### Twitter
```
node liri.js my-tweets
```
Returns your 20 most recent tweets.

### Spotify
```
node liri.js spotify-this-song
```
shows the following information about the song in the terminal
* artist(s)
* song name
* preview link of the song from spotify
* album that the song is a part of

### OMDB
```
node liri.js movie-this
```
 This would output the following information to the terminal:
* Title
* Year
* IMDB Rating
* Country
* Language
* Plot
* Actors
* Rotten Tomatoes Rating
* Rotten Tomatoes URL
