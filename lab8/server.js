var express = require('express');
var bodyParser = require('body-parser'); 
var validator = require('validator'); 
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/notuber';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

app.get('/', function(request, response) {
    var indexPage = "<!DOCTYPE HTML><html><head><title>Not Uber Database</title></head><body><h1>Not Uber Passengers</h1>";
    var message = '';
    db.collection('passengers', function(er, collection) {
        collection.find().toArray(function(err, results) {
            if (!err) {
                for (var count = 0; count < results.length; count++) {
                    message = results[count].username + " requested a vehicle at " + results[count].lat + ", " + results[count].lng + " on " + results[count].created_at;
                    indexPage += "<p>" + message + "</p>";
                }
                response.send(indexPage);
            } 
        });
    });
});

app.get('/vehicle.json', function(request, response) {
    var username = request.query.username;
    var vehicle = {};
    
    db.collection('vehicles', function(er, collection) {
		collection.find().toArray(function(err, results) {
			if (!err) {
				for (count = 0; count < results.length; count++) {
                    if (results[count].username == username) {
                        vehicle = results[count];
                    }
				}
				response.send(vehicle);
			} 
		});
	});
});

app.post('/submit', function(request, response) {
    response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "X-Requested-With");
    var fiveMinutesAgo = new Date(new Date().getTime() - 1000 * 60 * 5);
    var vehicles = ['JANET','ilFrXqLz', 't4wcLoCT', 'WnVPdTjF', '1fH5MXna', '4aTtB30R', '8CXROgIF', 'w8XMS577', 'ZywrOTLJ', 'cQRzspF5', 'GSXHB9L1', 'TztAkR2g', 'aSOqNo4S', 'ImjNJW4n', 'svEQIneI', 'N10SCqi5', 'QQjjwwH2', 'H0pfmYGr', 'FyUHoAvS', 'bgULOMsX', 'OlOBzZF8', 'Ln7b7ODx', 'ZoxN11Sa', 'itShXf78', 'o6kJKzyI', 'pD0kGOax', 'njr1i7xM', 'wtDRzig8', 'l2r8bViT', 'oZn3b2OZ', 'ym2J1vil'];
    
    var username = "";
    var lat = "";
    var lng = "";
    var type = "passenger";
    username =request.body.username;
    lat = parseFloat(request.body.lat);
    lng = parseFloat(request.body.lng);
    
    if (username == null || lat == null || lng == null) {
        response.send({"error": "Whoops, something is wrong with your data!"});
    }
    
    for (i = 0; i < vehicles.length; i++) {
        if (vehicles[i] == username) {
            type = "vehicle";
        }
    }
	var toInsert = {
		username: username,
        lat: lat,
        lng: lng,
        created_at: new Date()
	};
    var recentPassengers = {
        passengers: []
    };
    var recentVehicles = {
        vehicles: []
    };
    
    if (type == "passenger") {
        db.collection('passengers', function(error, coll) {
            
            coll.update({username:username}, toInsert, {upsert: true}, function(error, saved) {
                if (error) {
                    console.log("Error: " + error);
                    response.send(500);
                }
                else {
                    db.collection('vehicles', function(error, collection) {
                          collection.find().toArray(function(err, results) {
                             if (!err) {
                                for (var count = 0; count < results.length; count++) {
                                    if (results[count].created_at > fiveMinutesAgo) {
                                        recentVehicles.vehicles.push(results[count]);
                                    }
                                }
                                response.send(recentVehicles);
                             }
                          });
                    });
                }
            });
        });
    }
    
    if (type == "vehicle") {
        db.collection('vehicles', function(error, coll) {
            coll.update({username:username}, toInsert, {upsert: true}, function(error, saved) {
                if (error) {
                    console.log("Error: " + error);
                    response.send(500);
                }
                else {
                    db.collection('passengers', function(error, collection) {
                        collection.find().toArray(function(err, results) {
                             if (!err) {
                                for (var count = 0; count < results.length; count++) {
                                    if (results[count].created_at > fiveMinutesAgo) {
                                        recentPassengers.passengers.push(results[count]);
                                    }
                                }
                                response.send(recentPassengers);
                             }
                        });
                    });
                }
            });
        });
    }
});

app.listen(process.env.PORT || 3000);