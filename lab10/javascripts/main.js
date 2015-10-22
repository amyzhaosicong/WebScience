// error checking, should always build db first
// ng controller
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
//function MyController($scope) {
	console.log("inside ng controller");
	
	// handle the buildMongo button
	$scope.buildMongo = function() {
		console.log("inside buildMongo");
		$.get('/buildMongo', {}, function(resp) {
			console.log("response: ", resp);
			if (resp == "success") {
				console.log("buildMongo success");
				alert("buildMongo success!");
			}			
		});
		// create json file from  mongo db
		$.get('/createJSON/' + "tweets", {}, function(resp) {
				console.log("response: ", resp);
				if (resp == "success") {
					createJSON = true;
					console.log("createJSON success!");
					//alert("createJSON success! File " + filename + ".json now in the server");
			}		
		});
	}

	// handle the readJSON button
	$scope.readJSON = function() {
		console.log("inside readJSON");
		
		// error handling, check if build mongo db first
		$.get('/getMongo', {}, function(res) {
			if(res="success") {
				var numTweets = $scope.numTweets;
				window.location.href = '/showTweets';
				$.post('/showTweetsDetail/' + numTweets, {}, function(resp) {
					console.log("inside showTweetsDetail");
					if (resp == "success") {
						console.log("showTweetsDetail success");
					}
				});
			}
			else {
				alert("Cannot readJSON file from server, should Build Mongo DB first...");
			}
		});
	}

	// handle the createCSV button
	$scope.createCSV = function() {
		console.log("inside createCSV");

		// error handling, check if build mongo db first
		$.get('/getMongo', {}, function(res) {
			if (res="success") {
				var filename = $scope.CSVname;
				var csvfile = filename + ".csv";

		 		// error handling, if the csv file exists, overwrite it and inform the user
		 		$.get("../" + csvfile).success(function() {
			 		alert("Whoops, the " +csvfile +" file already exists. \nOverwriting it...");
			 		console.log("csv file already exists");
		 		});

		 		// create csv file from the back end
				$.post('/createCSV/' + filename, {}, function(resp) {
					if (resp == "success") {
						console.log("createCSV success!");
						alert("createCSV success! File " + filename + ".csv now in the server.");
					}
				});
			}
			else {
				alert("Cannot createCSV file from server, should Build Mongo DB first...");
			}
		});	
	}

});
	
