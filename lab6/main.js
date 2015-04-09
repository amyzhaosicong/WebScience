// AngularJS controller function
angular.module('MyApp',[])
.controller('MyController', ['$scope', function($scope) {
	$scope.hideByClick = true;
 	$scope.showByClick = false;

 	$scope.checkboxModel={
 		showHeader:true
 	}; 

 	console.log('showHeader',$scope.checkboxModel.showHeader);

 // after click the submit button
 $scope.submit = function() {
	 // hide front-end and show twitter data as did in lab 4
	 $scope.hideByClick = false;
	 $scope.showByClick = true;
	 // get json data
	 $.get("tweets.json").fail(function() {
		// error handling, if the json file does not exist and the user tries to convert, 
		// then an error should be thrown
		 alert("Whoops, the json file tried to convert does not exist.");
		 console.log("Whoops, the json file tried to convert does not exist.");
	 })
	 // if get json data successfully
	 .success(function(data) {
		 console.log(data);
		 var filename = $scope.filename;  
		 console.log('csv filename',filename);
		 var showheader = $scope.checkboxModel.showHeader;
		 console.log('showHeader',showheader);
		 var csvfile = filename + ".csv";
		 // error handling, if the tweets file exists, overwrite it and inform the user
		 $.get(csvfile).success(function() {
			 alert("Whoops, the tweets csv file already exists. Overwriting it...");
			 console.log("csv file already exists");
		 });
		 // call function to convert json to csv
		JSONToCSVConvertor(data, filename, showheader);
	 });
	};

}]);
// function that converts json to csv file
// referenced from http://jsfiddle.net/hybrid13i/JXrwM/
function JSONToCSVConvertor(JSONData, filename, ShowHeader) {
	// if JSONData is not an object then JSON.parse will parse the JSON string in an Object
	var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
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
	// initialize file format you want csv file
	var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
	// Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = filename + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}