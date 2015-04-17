// ng controller
function MyController($scope) {
	console.log("inside showTweets ng controller");
	var numTweets, data;
	// get TweetsDetail to see if read from mongodb or json file
	$.get('/getTweetsDetail', {}, function(resp) {
		console.log("TweetsDetail:", resp);
		if (resp == "yes") {
			$.get('/readTweets', {}, function(res) {
				console.log("res of readTweets: ", res);
				alert("Reading tweets from mongodb");
				data = res;
				console.log("output data: ", data);
				numTweets = data.length;
				processData(data, numTweets);
			});
		}
		else {
			numTweets = resp;
			$.get('/readJSON', {}, function(res) {
				console.log("res of readTweets: ", res);
				alert("Reading " + numTweets + " tweets from created json file");
				data = res;
				processData(data, numTweets);
			});
		}
	});
}

function processData(data, numTweets) {
	// following codes are similar from lab5
	var index = 0, index2 = 0, fadeIndex = 0, fadeIndex2 = 0;   // index in data set and index in fade
	var tweets = $(".tweet");
 	var hashtags = $(".hashtag");
 	// handles if input number if less than 5
 	var firstloop = 5;
 	if (numTweets <= 5) firstloop = numTweets;
 	// put the first 5 tweets into page
	for (var i = 0; i < firstloop; ++i) {
		// if retweeted, show retweeted user profile image, otherwise show user's profile image
		if (data[i].retweeted == true) {
			$(tweets[i]).html("<img src= " + data[i].retweeted_status.user.profile_image_url + " >" + data[i].text);
		}
		else {
			$(tweets[i]).html("<img src= " + data[i].user.profile_image_url + " >" + data[i].text);
		}
		// catch errors if images not found, hide the image and change it to a default twitter image from website
		$(tweets[i]).children("img")
		.error(function() {
			$(this).attr("src", "twitter.png");
		})
	}
	var tmp_index = 0;   // put the first hashtags into page
	while (tmp_index < firstloop) {
		var hashtag;
		var hashtag_length;

		if (data[index2].retweeted == true) {
			console.log(data[index2]);
			hashtag_length = data[index2].retweeted_status.entities.hashtags.length;
			if (hashtag_length != 0) {
				hashtag = data[index2].retweeted_status.entities.hashtags[hashtag_length - 1].text;	
				$(hashtags[tmp_index]).text("#" + hashtag + "#");
				++tmp_index;
			}	
		}
		else {
			hashtag_length = data[index2].entities.hashtags.length;
			if (hashtag_length != 0) {
				hashtag = data[index2].entities.hashtags[hashtag_length - 1].text;
				$(hashtags[tmp_index]).text("#" + hashtag + "#");
				++tmp_index;
			}
		}
		++index2;
	}
	console.log(index2);

	if (numTweets <= 5) return; // stop here if input number less than 5
	index += 5;   // now the index in json data set became 5
	// recursive fade function, fade out the last element, then move the other four back and fade in a new element
	function nextFade() {
		if (index >= numTweets) return; // only read the requested length of tweets
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
		if (index2 >= numTweets) return; 
		// check hashtag, only output the not undefined ones
		var hashtag;
		var hashtag_length;

		if (data[index2].retweeted == true) {
			hashtag_length = data[index2].retweeted_status.entities.hashtags.length;
			if (hashtag_length != 0) {
				hashtag = data[index2].retweeted_status.entities.hashtags[hashtag_length - 1].text;	
			}	
		}
		else {
			//hashtag = data[index2].entities.hashtags..text;
			hashtag_length = data[index2].entities.hashtags.length;
			if (hashtag_length != 0) {
				hashtag = data[index2].entities.hashtags[hashtag_length - 1].text;	
			}
		}
		console.log(hashtag_length);


		if (hashtag_length != 0) {
			console.log(data[index2]);
			// move one hashtag away each time
			$(hashtags[fadeIndex2]).fadeOut(3000, function() {
				++fadeIndex2;
				if (fadeIndex2 >= hashtags.length) fadeIndex2 = 0;  // set index back to 0 after each cycle completed		
				// move the other four hashtags up
				for (var i = 0; i < hashtags.length - 1; ++i) {
					var margin = 55*(i+1);
					$(hashtags[fadeIndex2]).animate({top: margin});
					++fadeIndex2;
					if (fadeIndex2 >= hashtags.length) fadeIndex2  = 0;
				}
				if (index2 >= data.length) index2 = 0;//return;  here keep looping
				// add one tweets and adjust its position each time
				$(hashtags[fadeIndex2]).text("#" + hashtag + "#");
				$(hashtags[fadeIndex2]).css("top", "275px").fadeIn(3000, nextFade2);	
				++index2;
				++fadeIndex2;
				if (fadeIndex2 >= hashtags.length) fadeIndex2 = 0;		
			});
		}
		else {
			++index2;
			nextFade2();
			if (fadeIndex2 >= hashtags.length) fadeIndex2 = 0;		
		}		
	}
	nextFade2(); 
}