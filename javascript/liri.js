require("dotenv").config();
var keys = require("./keys.js"); 
var Spotify = require("spotify-web-api-node"); 
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


