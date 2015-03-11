// angular js 
function MyController($scope, $http) {
 $scope.hideByClick = true;
 $scope.showByClick = false;
 // after click the submit button
 $scope.submit = function() {
	 // hide front-end and show twitter data as did in lab 4
	 $scope.hideByClick = false;
	 $scope.showByClick = true;
	 console.log('requsted counts: ', $scope.counts);
	 // get json data
	 $http.get("tweets.json").success(function(data) {
		 console.log(data);
		 var datalength = $scope.counts;  // only read the requested length of tweets
		 console.log('datalength',datalength);
		 // following codes are similar from lab4
 		var index = 0, index2 = 0, fadeIndex = 0, fadeIndex2 = 0;   // index in data set and index in fade
 		var tweets = $(".tweet");
 		var hashtags = $(".hashtag");
		// put the first 5 tweets into page
		for (var i = 0; i < 5; ++i) {
			if (index > datalength) return; // only read the requested length of tweets
			// if retweeted, show retweeted user profile image, otherwise show user's profile image
			if (data[i].retweeted == true) {
				$(tweets[i]).html("<img src= " + data[i].retweeted_status.user.profile_image_url + " >" + data[i].text);
			}
			else {
				$(tweets[i]).html("<img src= " + data[i].user.profile_image_url + " >" + data[i].text);
			}
			$(hashtags[i]).text("#" + data[i].entities.hashtags.text + "#");
			// catch errors if images not found, hide the image and change it to a default twitter image from website
			$(tweets[i]).children("img")
			.error(function() {
				$(this).attr("src", "twitter.png");
			})
		}
		index += 5;   // now the index in json data set became 5
		index2 += 5;
		// recursive fade function, fade out the last element, then move the other four back and fade in a new element
		function nextFade() {
			console.log(index, datalength);
			if (index >= datalength) return; // only read the requested length of tweets
			// move one image away each time
			$(tweets[fadeIndex]).fadeOut(3000, function() {
				++fadeIndex;
				if (fadeIndex >= tweets.length) fadeIndex = 0;  // set index back to 0 after each cycle completed
				// move the other four tweets up
				for (var i = 0; i < tweets.length - 1; ++i) {
					var margin = 55*(i+1);
					$(tweets[fadeIndex]).animate({top: margin});
					++fadeIndex;
					if (fadeIndex >= tweets.length) fadeIndex  = 0;
				}
				if (index >= data.length) index = 0;  //here keep loop
				// add one tweets and adjust its position each time
				// if retweeted, show retweeted user profile image, otherwise show user's profile image
				if (data[index].retweeted == true) {
					$(tweets[fadeIndex]).html("<img src= " + data[index].retweeted_status.user.profile_image_url + " >" + data[index].text);
				}
				else {
					$(tweets[fadeIndex]).html("<img src= " + data[index].user.profile_image_url + " >" + data[index].text);
				}
				$(tweets[fadeIndex]).css("top", "275px").fadeIn(3000, nextFade);	
				// catch errors if images not found, hide the image and change it to a default twitter image from website
				$(tweets[fadeIndex]).children("img")
				.error(function() {
					$(this).attr("src", "twitter.png");
				})
				++index;
				++fadeIndex;
				if (fadeIndex >= tweets.length) fadeIndex = 0;
				
			});
		}
		nextFade(); 
		
		// another Fade function for hashtags
		function nextFade2() {
			if (index2 >= datalength) return;
			// move one image away each time
			$(hashtags[fadeIndex2]).fadeOut(3000, function() {
				++fadeIndex2;
				if (fadeIndex2 >= hashtags.length) fadeIndex2 = 0;  // set index back to 0 after each cycle completed
				// move the other four tweets up
				for (var i = 0; i < tweets.length - 1; ++i) {
					var margin = 55*(i+1);
					$(hashtags[fadeIndex2]).animate({top: margin});
					++fadeIndex2;
					if (fadeIndex2 >= hashtags.length) fadeIndex2  = 0;
				}
				if (index2 >= data.length) index2 = 0;//return;  here keep looping
				// add one tweets and adjust its position each time
				$(hashtags[fadeIndex2]).text("#" + data[index2].entities.hashtags.text + "#");
				$(hashtags[fadeIndex2]).css("top", "275px").fadeIn(3000, nextFade2);	
				++index2;
				++fadeIndex2;
				if (fadeIndex2 >= hashtags.length) fadeIndex2 = 0;	
			});
		}
		nextFade2(); 
	 });
 }
}


