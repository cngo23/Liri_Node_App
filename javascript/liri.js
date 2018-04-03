require("dotenv").config();
var keys = require("./keys.js"); 
var Spotify = require("node-spotify-api"); 
var Twitter = require("twitter"); 
var spotify = new Spotify(keys.spotify); 
var client = new Twitter(keys.twitter);

var userInput = process.argv[2];
var user = process.argv[3];


if(userInput === "twitter" && user){
    console.log(user)
    recentTweets();
}else if(userInput === "twitter" && !user){
    console.log("Please enter valid @user")
}

if(userInput === "spotify" && user){
    spotifySearch();
}else if(userInput === "spotify" && !user){
    console.log("Please enter a valid track name within \'\' ")
}
// twitter
function recentTweets(){
    var parameters = {
        screen_name: user ,
        count: 12
    }
    console.log(recentTweets)
    client.get("statuses/user_timeline", parameters, function(error, tweets, response) {
        if (error) {
            return console.log(error)
        }
        for (var i = 0; i < tweets.length; i++){
            var latestPost = ("Post: " + tweets[i].text);
            console.log(latestPost)
        }
    });
}

// spotify
function spotifySearch(){
    console.log("put some stuff here")
    spotify.search({ type: "track", query: user}, function(error, data){
        if(error) {
            return console.log("Error occurred: " + error);
        }
        for(var i=0; i < data.tracks.items.length; i++){
            var spotSearch = data.tracks.items[i].name;
            var secSearch = data.tracks.items[i].album.external_urls.spotify;
            console.log(spotSearch);
            console.log(secSearch);
        }
        
    });
}

