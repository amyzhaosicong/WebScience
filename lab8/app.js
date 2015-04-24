// require express, sparql-client
var express = require('express');
var SparqlClient = require('sparql-client');
var util = require('util');   // not sure here
var bodyParser = require('body-parser');
var endpoint = 'http://dbpedia.org/sparql';
var app = express();

// server default route handler
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})

// serving static files
app.use(express.static(__dirname));

// request for body parser
// to get none warning, referenced from
// http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// now start server
var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log('Server listening on port', port);
})

// routes that get query from front-end
app.post('/getQuery', function(req, res) {
	console.log("inside getQuery");
	var query = req.body.query;
	console.log("input query: ", query);

	// call sqaral client to execute the query
	var client = new SparqlClient(endpoint);
	console.log("Query to " + endpoint);
	console.log("Query: " + query);
	client.query(query, function (error, results) {
    		res.send(results);
     	process.stdout.write(util.inspect(arguments, null, 20, true) + "\n");
 	});
});

/*
Exampe input query:
Get a list of books including their genres. The list will be formatted or grouped by genres
SELECT * 
FROM <http://dbpedia.org> 
WHERE { ?book <http://dbpedia.org/ontology/literaryGenre> ?genre. ?book <http://dbpedia.org/property/author> ?author} LIMIT 10;
*/