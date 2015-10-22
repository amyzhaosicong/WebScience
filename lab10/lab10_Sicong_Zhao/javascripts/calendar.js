$(document).ready(function() {
	// read tweets data from server and parse them to certain csv file
	$.get("../tweets.json", function(tweets) {
		console.log(tweets);
		var dates = [];
		var counts = [];
		var dates_index = 0;
		for (var i = 0; i < tweets.length; ++i) {
			// transfer date format
			// Thu May 07 20:30:44 +0000 2015
			var date;
			if (tweets[i].retweeted) {
				date = tweets[i].retweeted_status.created_at;
			}
			else date = tweets[i].created_at;
			//console.log(date);
			var res = date.split(" ");
			//console.log(res);
			var day, month, year;
			day = res[2];
			year = res[5];
			if (res[1] == "Jan") month = "01";
			if (res[1] == "Feb") month = "02";
			if (res[1] == "Mar") month = "03";
			if (res[1] == "Apr") month = "04";
			if (res[1] == "May") month = "05";
			if (res[1] == "Jun") month = "06";
			if (res[1] == "Jul") month = "07";
			if (res[1] == "Aug") month = "08";
			if (res[1] == "Sep") month = "09";
			if (res[1] == "Oct") month = "10";
			if (res[1] == "Nov") month = "11";
			if (res[1] == "Dec") month = "12";


			// loop dates to count
			var tmp  = year + "-" + month + "-" + day;
			var found = false;
			for (var j = 0; j < dates.length; ++j) {
				if (dates[j] == tmp) {
					counts[j]++;
					found = true;
					break;
				}
			}
			if (!found) {
				dates[dates_index] = tmp;
				counts[dates_index] = 1;
				++dates_index;
			}

		}
		console.log(dates);
		console.log(counts);

		// transfer to csv file
		var csv = '';
		csv += "date,total\r\n";
		for (var i = 0; i < dates.length; ++i) {
			csv += dates[i]+","+ counts[i]+"\r\n";
		}
		console.log(csv);

		// send calendar csv data to server
		$.post('/calendarCSV', {csv:csv});
	
		 // calendar code referenced from 
		 // http://bl.ocks.org/mhska/5333055
		var margin = {top: 5.5, right: 0, bottom: 5.5, left: 19.5},
		    width = 960 - margin.left - margin.right,
		    height = 130 - margin.top - margin.bottom,
		    size = height / 7;
		 
		var day = function(d) { return (d.getDay() + 6) % 7; }, // monday = 0
		    week = d3.time.format("%W"), // monday-based week number
		    date = d3.time.format("%Y-%m-%d"),
		    percent = d3.format("+.1%");
		 
		var color = d3.scale.quantize()
		    .domain([1,5,10,15])
		    .range(d3.range([12]));
		    
		var svg = d3.select("body").selectAll("svg")
		   .data(d3.range(2014, 2016))
		   //.data(d3.range(2011, 2013))
		  .enter().append("svg")
		    .attr("class", "RdYlGn")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		 
		svg.append("text")
		    .attr("transform", "translate(-6," + size * 3.5 + ")rotate(-90)")
		    .attr("text-anchor", "middle")
		    .text(function(d) { return d; });
		 
		var rect = svg.selectAll(".day")
		    .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
		  .enter().append("rect")
		    .attr("class", "day")
		    .attr("width", size)
		    .attr("height", size)
		    .attr("x", function(d) { return week(d) * size; })
		    .attr("y", function(d) { return day(d) * size; })
		    .map(date);
		 
		rect.append("title")
		    .text(function(d) { return d; });
		 
		svg.selectAll(".month")
		    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
		  .enter().append("path")
		    .attr("class", "month")
		    .attr("d", monthPath);
		 
		d3.csv("../calendar.csv", function(csv) {
		  var data = d3.nest()
		    .key(function(d) { return d.date; })
		    .rollup(function(d) { return d[0].total; })
		    .map(csv);
		  
		  	
		 
		  rect.filter(function(d) { return d in data; })
		      .attr("class", function(d) { return "day q" + color(data[d]) + "-11"; })
			  .select("title")
		      .text(function(d) { return d + " (počet zverejnených zmlúv): " + data[d]; });
		});
		 
		function monthPath(t0) {
		  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
		      d0 = +day(t0), w0 = +week(t0),
		      d1 = +day(t1), w1 = +week(t1);
		  return "M" + (w0 + 1) * size + "," + d0 * size
		      + "H" + w0 * size + "V" + 7 * size
		      + "H" + w1 * size + "V" + (d1 + 1) * size
		      + "H" + (w1 + 1) * size + "V" + 0
		      + "H" + (w0 + 1) * size + "Z";
		}
	});
});