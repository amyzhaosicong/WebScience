var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    console.log("inside myCtrl");
    $scope.submit = function() {
    		console.log("inside submit");
    		var query = "SELECT " + $scope.select + " FROM " + $scope.from + " WHERE " + $scope.where;
    		console.log("input query: ", query);
    		// post query data to server
    		var posting = $http({
    			method: 'POST',
    			url: '/getQuery',
    			data: {query: query}
    		})
    		posting.success(function(res) {
    			console.log("res", res);
    			console.log("Get data success");
    			alert("Get data success!");

    			// create a json object to store the response data
    			var data = {};
    			var links = []
    			data.links = links;

    			// input results into created json object
    			for (var i = 0; i < res.results.bindings.length; ++i) {
    				var book = res.results.bindings[i].book.value;
    				var author = res.results.bindings[i].author.value;
    				var genre = res.results.bindings[i].genre.value;
    				var link = {
    					"book" : book,
    					"author" : author,
    					"genre" : genre
    				}
    				data.links.push(link);
    			}		
    			console.log(links);
    			$scope.items = links;
    		});
    }
});