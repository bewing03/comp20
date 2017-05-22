var express = require("express");
var bodyParser = require('body-parser'); 
var validator = require('validator'); 
var app = express();
var path = __dirname + '/public/';

app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With" + 
                "Content-Type, Accept");
        next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/highscores';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});


app.use(express.static("public"));

app.get('/leaderboard', function(request, response) {
    var indexPage = "<!DOCTYPE HTML><html><head><title>Loud Farm Leaderboard</title><link href='gameplay.css' rel='stylesheet'></head><body><h1>Leaderboards</h1>";
    var scores;
    indexPage += '<a id="gameplay" class="nav-link" href="scores.html">Leaderboard</a><a id="gameplay2" class="nav-link" href="gameplay.html"> Play Again! </a>';
    console.log("leader");
    db.collection('highscores', function(err, collection) {
        collection.find().limit(5).sort({highscore:-1}).toArray(function(errors, results){
                if (!err) {
                    console.log("hello");
                    console.log(results);
                    indexPage += "<h2> TOP SCORES: </h2> <ol>  "
                    for (var count = 0; count < results.length; count++) {
                        scores = results[count].highscore;
                        console.log(scores);
                        indexPage+= "<li> " + scores + " </li>" + "<br>";
                    }
                    indexPage += "</ol>"
                    response.send(indexPage);
                } 
        });
    });
});






app.post('/submit', function(request, response){
    var highscore = request.body.highscore;

    highscore = highscore.replace(/[^\w\s]/gi, '');
    
	var toInsert = {
		"highscore": highscore
	};
    
	db.collection('highscores', function(error, coll) {
		coll.insert(toInsert, function(error, saved) {
			if (error) {
				console.log("Error: " + error);
				response.send(500);
			}
			else {
				response.send(200);
			}
	    });
	});
});

app.listen(process.env.PORT || 3000);
