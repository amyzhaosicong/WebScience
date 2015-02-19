$(document).ready(function() {
	// Use the HTML5 Geolocation API to retrieve the current location from the browser
	function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);		
	    } else { 
				$("#demo").text = "not supported.";
	    }
	}
   // Pass the location to the open weather map API and populate the weather data in the browser
	function showPosition(position) {
		$.ajax({
			type : "GET",
			url : "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude,
			dataType : "jsonp",
			success : function(response) {
				var temp = (response.main.temp - 273.15).toFixed(1);
				//console.log(response);
				$("#icon").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
				$("#temp").text(temp + " °C" );
				$("#city_name").text(response.name);
				$("#description").text(response.weather[0].description);
				$("#wind").text("Wind: " + response.wind.speed + "mps");
				$("#humidity").text("Humidity: " + response.main.humidity + "%");
			}
		});
	}
	// finally call get location function
	getLocation();
})

















