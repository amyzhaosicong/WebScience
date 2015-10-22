$(document).ready(function() {
	// read tweets data from server and parse then to certain map json file
	$.get("/tweets.json", function(tweets) {
		console.log(tweets);
		var locations = [];
		var counts = [];		
		var loc_index = 0;
		for (var i = 0; i < tweets.length; ++i) {
			var loc, count, tmp_loc;
			if (tweets[i].retweeted) {
				loc = tweets[i].retweeted_status.user.location;
				count = tweets[i].retweeted_status.user.friends_count;
			}
			else {
				loc = tweets[i].user.location;
				count = tweets[i].user.friends_count;
			}
			if (loc == "Austin, Texas") tmp_loc = [-97.388631,30.943149];  // Texas state coordinates
			else if (loc == "Los Angeles") tmp_loc = [-119.355165,35.458606];   // California state
			else if (loc == "NY/LA/Wakanda/Knowhere") tmp_loc = [-119.355165,35.458606]; // California
			else if (loc == "Santa Monica, California") tmp_loc =  [-119.355165,35.458606]; // California
			else if (loc == "Albany, NY") tmp_loc = [-74.645228,41.507548]; // New York
			else if (loc == "Indiana") tmp_loc = [-86.261515,40.163935];
			else if (loc == "California, Santa Monica") tmp_loc = [-119.355165,35.458606];
			else if (loc == "Worldwide") tmp_loc = [-157.524452,21.146768];
			else if (loc == "Mystic Falls, VA") tmp_loc = [-77.835857,37.750345]; 
			else if (loc == "San Francisco") tmp_loc = [-119.355165,35.458606];
			else if (loc == "New York, NY") tmp_loc = [-74.645228,41.507548];
			else tmp_loc = [-74.645228,41.507548];  // default location: New York

			// loop locations to count
			var found = false;
			for (var j = 0; j < locations.length; ++j) {
				if (locations[j][0] == tmp_loc[0]) {
					counts[j] += count;
					found = true;
					break;
				}
			}
			if (!found) {
				locations[loc_index] = tmp_loc;
				counts[loc_index] = count;
				++loc_index;
			}
		}

		console.log(locations);
		console.log(counts);

		// transfer to json file
		var data = [];
		for (var i = 0; i < locations.length; ++i) {
			var item = {
				"type":"Feature",
				"geometry": {
					"type":"Point",
					"coordinates":locations[i]
				},
				"properties":{
					"counts":counts[i]
				}
			}
			data.push(item);
		}
		console.log(data);
		//console.log(JSON.stringify(data));
		var output = {
			"type":"FeatureCollection",
			"features":data
		}
		console.log(output);
		console.log(JSON.stringify(output));

		// send map json csv data to server
		$.post('/mapJSON', {json:output});


		// map d3 scripts
		var width = 960,
    		height = 500;

		var radius = d3.scale.sqrt()
		    .domain([0, 100])
		    .range([0, 10]);

		var path = d3.geo.path();

		var svg = d3.select("body").append("svg")
		    .attr("width", width)
		    .attr("height", height);

		queue()
		    .defer(d3.json, "/data/us.json")
		    .defer(d3.json, "../map.json")
		    .await(ready);

		function ready(error, us, centroid) {
		  svg.append("path")
		      .attr("class", "states")
		      .datum(topojson.feature(us, us.objects.states))
		      .attr("d", path);

		  svg.selectAll(".symbol")
		      .data(centroid.features.sort(function(a, b) { return b.properties.counts - a.properties.counts; }))
		      .enter().append("path")
		      .attr("class", "symbol")
		      .attr("d", path.pointRadius(function(d) { return radius(d.properties.counts); }));
		}
	});
});