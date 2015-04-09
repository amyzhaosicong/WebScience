// create a node server using express
//var app = require('express')();
var express = require('express');
var app = express();

// server route handler
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})
// serving static files 
app.use(express.static(__dirname));

// start server
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Tweets app listening at http://%s:%s', host, port);
})

// read twitter stream using twitter api
// code learnt from https://www.npmjs.com/package/twitter
var Twitter = require('twitter');

 // get authentification of twitter api
var client = new Twitter({
  consumer_key: 'gKpkmA3Eq8PUrGl1zxdD0Wpkk',
  consumer_secret: 'OURMDNh466PWn0RCNEzLaw2VMwgclTu9ePt1GmJb9Vo0QU6omQ',
  access_token_key: '2463305354-UC04mClTPzpUQcxcbYFpQ4JrILwmkRfGlJ5rRKb',
  access_token_secret: 'rl00v8q8539Wuq0c2QDM9EAxKdUbNIuH6z3PfdREh8aHD'
});

// get twitter data and write in to file tweets.json
client.get('statuses/user_timeline',  function(error, tweets, response){
  if (!error) {
    //console.log(tweets);
	// fs code from https://nodejs.org/api/fs.html#fs_file_system
	// write tweets according to convention
	var fs = require('fs');
	// here, use JSON.stringify instead of just using tweets, sugg from luying
	fs.writeFile('tweets.json', JSON.stringify(tweets,null,4), function(err) {
		if (err) throw err;
		console.log('It\'s saved');
	});
  }
});





