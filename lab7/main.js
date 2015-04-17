// error checking, should always build db first
// ng controller
function MyController($scope) {
	console.log("inside ng controller");
	var buildMongo = false;
	var createJSON = false;

	// handle the buildMongo button
	$scope.buildMongo = function() {
		console.log("inside buildMongo");
		$.get('/buildMongo', {}, function(resp) {
			console.log("response: ", resp);
			if (resp == "success") {
				buildMongo = true;
				console.log("buildMongo success");
				alert("buildMongo success!");
			}			
		});
	}

	// handle the readTweets button
	$scope.readTweets = function() {
		console.log("inside readTweets");
		if (!buildMongo) {
			alert("Cannot read tweets from server, should Build Mongo DB first...");
		}
		else {
			var fromDB = "yes";
			window.location.href = '/showTweets';
			$.post('/showTweetsDetail/' + fromDB, {}, function(resp) {
				console.log("inside showTweetsDetail");
				if (resp == "success") {
					console.log("showTweetsDetail success");
				}
			});
		}
	}

	// handle the createJSON button
	$scope.createJSON = function() {
		console.log("inside createJSON");
		if (!buildMongo) {
			alert("Cannot createJSON file from server, should Build Mongo DB first...");
		}
		else {
			var filename = $scope.JSONname;
			console.log("input json file name: ", filename);
			$.get('/createJSON/' + filename, {}, function(resp) {
				console.log("response: ", resp);
				if (resp == "success") {
					createJSON = true;
					console.log("createJSON success!");
					alert("createJSON success! File " + filename + ".json now in the server");
				}		
			});
		}
	}

	// handle the readJSON button
	$scope.readJSON = function() {
		console.log("inside readJSON");
		if (!buildMongo) {
			alert("Cannot readJSON file from server, should Build Mongo DB first...");
		}
		else if (!createJSON) {
			alert("Cannot readJSON file from server, should createJSON file first...");
		}
		else {
			var numTweets = $scope.numTweets;
			window.location.href = '/showTweets';
			$.post('/showTweetsDetail/' + numTweets, {}, function(resp) {
				console.log("inside showTweetsDetail");
				if (resp == "success") {
					console.log("showTweetsDetail success");
				}
			});
		}
	}

	// handle the createCSV button
	$scope.createCSV = function() {
		console.log("inside createCSV");
		if (!buildMongo) {
			alert("Cannot createCSV file from server, should Build Mongo DB first...");
		}
		else if (!createJSON) {
			alert("Cannot createCSV file from server, should createJSON file first...");
		}
		else {
			var filename = $scope.CSVname;
			$.post('/createCSV/' + filename, {}, function(resp) {
				if (resp == "success") {
					console.log("createCSV success!");
					alert("createCSV success! File " + filename + ".csv now in the server");
				}
			});
		}
	}
};
	
