$(document).ready(function() {
	$.getJSON("tweets-clean.json", function(data) {
		var index = 0, fadeIndex = 0;   // index in data set and index in fade
		var tweets = $(".tweet");
		
		// put the first 5 tweets into page
		for (var i = 0; i < 5; ++i) {
			$(tweets[i]).children(".text").html("<img src= " + data[i].user.profile_image_url + " >" + data[i].text);
			$(tweets[i]).children(".hashtag").text("#" + data[i].entities.hashtags.text + "#");
			$(tweets[i]).css("top", i*100);
			// catch errors if images not found, hide the image and change it to a default twitter image from website
			$(tweets[i]).children(".text").children("img")
			.error(function() {
				$(this).attr("src", "https://lh3.ggpht.com/lSLM0xhCA1RZOwaQcjhlwmsvaIQYaP3c5qbDKCgLALhydrgExnaSKZdGa8S3YtRuVA=w300");
			})
		}
		index += 5;   // now the index in json data set became 5
		
		function nextFade() {
			// move one image away each time
			$(tweets[fadeIndex]).fadeOut(3000, function() {
				++fadeIndex;
				if (fadeIndex >= tweets.length) fadeIndex = 0;  // set index back to 0 after each cycle completed
				// move the other four tweets up
				for (var i = 0; i < tweets.length - 1; ++i) {
					var margin = 95*(i+1);
					$(tweets[fadeIndex]).animate({top: margin});
					++fadeIndex;
					if (fadeIndex >= tweets.length) fadeIndex  = 0;
				}
				if (index >= data.length) return;  //break loop if run out of data
				// add one tweets and adjust its position each time
				$(tweets[fadeIndex]).children(".text").html("<img src= " + data[index].user.profile_image_url + " >" + data[index].text);
				$(tweets[fadeIndex]).children(".hashtag").text("#" + data[index].entities.hashtags.text + "#");
				$(tweets[fadeIndex]).css("top", "480px").fadeIn(3000, nextFade);	
				// catch errors if images not found, hide the image and change it to a default twitter image from website
				$(tweets[fadeIndex]).children(".text").children("img")
				.error(function() {
					$(this).attr("src", "https://lh3.ggpht.com/lSLM0xhCA1RZOwaQcjhlwmsvaIQYaP3c5qbDKCgLALhydrgExnaSKZdGa8S3YtRuVA=w300");
				})
				++index;
				++fadeIndex;
				if (fadeIndex >= tweets.length) fadeIndex = 0;
			});
		}
		nextFade(); 
	});
});
