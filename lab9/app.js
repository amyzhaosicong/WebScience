// require express, mongodb, fs and twitter
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var Twitter = require('twitter');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

var buildMongo = false;

// get twitter api authentification
var client = new Twitter({
 	consumer_key: 'gKpkmA3Eq8PUrGl1zxdD0Wpkk',
 	consumer_secret: 'OURMDNh466PWn0RCNEzLaw2VMwgclTu9ePt1GmJb9Vo0QU6omQ',
 	access_token_key: '2463305354-UC04mClTPzpUQcxcbYFpQ4JrILwmkRfGlJ5rRKb',
 	access_token_secret: 'rl00v8q8539Wuq0c2QDM9EAxKdUbNIuH6z3PfdREh8aHD'
});

// server default route handler
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// set showTweets page route handler
app.get('/showTweets', function(req, res, next) {
	console.log("inside showTweets");
	res.sendFile(__dirname + '/views/showTweets.html');
});

// get build mongo bool to see if the database is built of not
app.get('/getMongo', function(req, res) {
	//res.send(buildMongo);
	if(buildMongo) res.send("success");
	else res.send("fail");
});

// serving static files 
app.use(express.static(__dirname));

// connect to the mongodb
MongoClient.connect("mongodb://localhost:27017/lab9", function(err, db) {
	if (err) return console.dir(err);
	var collection = db.collection('tweets');

	// routes that build a mongodb and populate it with tweets from the twitter API
	app.get('/buildMongo', function(req, res) {
		console.log("inside buildMongo");
		client.get('statuses/user_timeline',  function(err, tweets, response) {
			if (!err) {
				collection.insert(tweets);
				res.send("success");
				buildMongo=true;
			}
		});
	});

	// routes that read tweets from mongodb and send data back
	app.get('/readTweets', function(req, res) {
		console.log("inside readTweets");
		collection.find().toArray(function(err, items) {
 			//res.json(items); 
 			res.send(items);
 		});
	});

	// route middleware to validate :data
	app.param('data', function(req, res, next, data) {
    		console.log('doing name validations on ' + data);
		// once validation is done save the new item in the req
   		 req.data = data;
    		// go to the next thing
    		next(); 
	});

	// TweetsDetail variable, set to "yes" if loaded from mongodb
	// set to the number of input read tweets number if loaded from json file
	var TweetsDetail; 
	// showTweetsDetail route 
	app.post('/showTweetsDetail/:data', function(req, res) {
		console.log("inside showTweetsDetail");
		TweetsDetail = req.data;
		console.log("TweetsDetail:", TweetsDetail);
		res.send("success");
	});

	// get showTweetsDetail route
	app.get('/getTweetsDetail', function(req, res) {
		console.log("inside getTweetsDetail");
		res.send(TweetsDetail);
	});

	var filename;
	// routes that create a json file from tweets in mongodb
	app.get('/createJSON/:data', function(req, res) {
		console.log("inside createJSON");
		filename = req.data;
		filename = filename + ".json";
		console.log("input file name: ", filename);
		// read tweets from mongodb
		collection.find().toArray(function(err, items) {
 			// write json file according to convention
			fs.writeFile(filename, JSON.stringify(items,null,4), function(err) {
				if (err) throw err;
				console.log('JSON file saved');
				res.send("success");
			});
 		});	
	});

	// routes that read new created tweets json file 
	app.get('/readJSON', function(req, res) {
		console.log("inside readJSON");
		res.sendFile(__dirname + '/' + filename);
	});
	
	// routes that create a csv file
	app.post('/createCSV/:data', function(req, res) {
		console.log("inside createCSV");
		filename = req.data;
		filename = filename + ".csv";
		console.log("input file name: ", filename);
		collection.find().toArray(function(err, items) {
		 	// call function to convert json to csv
			var csv = JSONToCSVConvertor(items, filename, true);
			// write csv file according to convention
    			fs.writeFile(filename, csv, function(err) {
    				if (err) throw err;
    				console.log('CSV file saved');
    				res.send("success");
    			});
		});	
	});
});

// now start server
var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log('Tweets app listening on port', port);
});

// function that converts json to csv file, from lab6
function JSONToCSVConvertor(JSONData, filename, ShowHeader) {
	// if JSONData is not an object then JSON.parse will parse the JSON string in an Object
	//var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
	var arrData = JSONData;
	var CSV = ''; 
	// generate the header if requested
	if (ShowHeader) {
		var row = "";
		// thie loop will extract the header from 1st index of an array
		for (var index in arrData[0]) {
			// now convert each value to string and comma-separated
			row += '"' + index + '",';
		}
		row = row.slice(0, -1);
		// append header row with line break
		CSV += row + '\r\n';
	}
	// 1st loop is to extract each row
	for (var i = 0; i < arrData.length; ++i) {
		var row = "";
		// 2nd loop will extract each column and convert it in string comma-separated
		for (var index in arrData[i]) {
			row += '"' + arrData[i][index] + '",';
		}
		row.slice(0, row.length - 1);
		// add a line break after each row
		CSV += row + '\r\n';
	}
	if (CSV == '') {
		alert("Invalid data");
		return;
	}
	return CSV;	
}