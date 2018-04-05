require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var inquirer = require("inquirer");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// old logic before inquirer
// var userInput = process.argv[2];
// var user = process.argv[3];


// if(userInput === "twitter" && user){
//     console.log(user)
//     recentTweets();
// }else if(userInput === "twitter" && !user){
//     console.log("Please enter valid @user")
// }

// if(userInput === "spotify" && user){
//     spotifySearch();
// }else if(userInput === "spotify" && !user){
//     console.log("Please enter a valid track name within \'\' ")
// }
inquirer.prompt([{
    type: "list",
    message: "What are you looking for?",
    name: "userInput",
    choices: ["Tweets", "Songs", "Movies"]
}]).then(function (select) {
    if (select.userInput === "Tweets") {
        recentTweets();
    } else if (select.userInput === "Songs") {
        spotifySearch();
    } else if (select.userInput === "Movies") {
        movieSearch();
    }
})

// twitter
function recentTweets() {
    inquirer.prompt([{
        type: "input",
        message: "Enter desired @name (handle)",
        name: "user"
    }]).then(function (answer) {
        var parameters = {
            screen_name: answer.user,
            count: 20
        }
        // console.log(recentTweets)
        // console.log(parameters)
        client.get("statuses/user_timeline", parameters, function (error, tweets, response) {
            if (error) {
                return console.log(error)
            }
            for (var i = 0; i < tweets.length; i++) {
                var latestPost = ("Date: " + tweets[i].created_at + '\n' + "Post: " + tweets[i].text);
                console.log(latestPost)
            }
        });
    })
}

// spotify
function spotifySearch() {
    inquirer.prompt([{
        type: "input",
        message: "Search a song, artist, or album: ",
        name: "user"
    }]).then(function (answer) {
        var parameters = {
            type: "track",
            query: answer.user,

        }
        // console.log(parameters)
        spotify.search(parameters, function (error, data) {
            if (error) {
                return console.log("Error occurred: " + error);
            }
            for (var i = 0; i < data.tracks.items.length; i++) {
                var spotSearch = data.tracks.items[i].name;
                var urlSearch = data.tracks.items[i].album.external_urls.spotify;
                //var secSearch = data.tracks.items[i].artists;
                console.log(spotSearch);
                console.log(urlSearch);
                // console.log(secSearch);
            }
        })


    })
}

// movie search
function movieSearch() {
    inquirer.prompt([{
        type: "input",
        message: "Search for a movie name: ",
        name: "user"
    }]).then(function (answer) {
        // console.log(answer.user);
        request("http://www.omdbapi.com/?t=" + answer.user + "&apikey=trilogy", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(`
                =========================================
                * Title of the movie:  ${JSON.parse(body).Title}
                * Year the movie came out:  ${JSON.parse(body).Year}
                * IMDB Rating of the movie:  ${JSON.parse(body).Rated}
                * Rotten Tomatoes Rating of the movie:  ${JSON.parse(body).Value}
                * Country where the movie was produced:  ${JSON.parse(body).Country}
                * Language of the movie:  ${JSON.parse(body).Language}
                * Plot of the movie:  ${JSON.parse(body).Plot}
                * Actors in the movie.:  ${JSON.parse(body).Actors}
                =========================================
                `)
            }
        })
    })
}



//my ombd api key http://www.omdbapi.com/?i=tt3896198&apikey=3cbbf6af (did not work, gave undefined)