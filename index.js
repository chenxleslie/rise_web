// refresh all
function refreshAll() {
    callDateTimeLoad();
    tommyWeatherLoad();
    leslieWeatherLoad();
    tommyTransitLoad();
    leslieTransitLoad();
    handleClientLoad1();
    handleClientLoad2(); 
}

// refresh time and transit
function realtimeRefresh() {
    callDateTimeLoad();
    tommyTransitLoad();
    leslieTransitLoad();
}

// current date and time
function callDateTimeLoad() {
    setInterval(dateTimeLoad(), 10000);
}

function dateTimeLoad() {
    var currentDate = new Date(),
    	day = currentDate.getDay(),
        date = currentDate.getDate(),
        month = currentDate.getMonth(),
        year = currentDate.getFullYear();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dateFormatted = dayNames[day] + ", " + monthNames[month] + " " + date + ", " + year;
    document.getElementById("date").innerHTML = dateFormatted;
    
    var currentTime = new Date(),
        hours = currentTime.getHours(),
        minutes = currentTime.getMinutes();
    var greeting = "Good Morning, ";
    if (hours >= 12 && hours < 18) {
        greeting = "Good Afternoon, ";
    }
    else if (hours >= 18 || hours < 6) {
	greeting = "Good Evening, ";
    } 
    document.getElementById("tommy-greeting").innerHTML = greeting + "Tommy";
    document.getElementById("leslie-greeting").innerHTML = greeting + "Leslie";
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var suffix = "am";
    if (hours >= 12) {
        suffix = "pm";
        hours = hours - 12;
    }
    if (hours == 0) {
        hours = 12;
    }
    var timeFormatted = hours + ":" + minutes + suffix;
    document.getElementById("time").innerHTML = timeFormatted;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function calculateCountdown(string) {
    var departTime = string.getTime();
    var currentTime = new Date().getTime();
    var timeDiff = departTime - currentTime;
    return Math.floor(timeDiff / (1000 * 60));
}

// OpenWeatherMap Weather API
function tommyWeatherLoad() {
    var currentRequestURL = 'http://api.openweathermap.org/data/2.5/weather?id=5375480&units=imperial&appid=5b90c7fcc89098335ea9a9b9b3ded432&format=json';
    var currentRequest = new XMLHttpRequest();
    currentRequest.open('GET', currentRequestURL);
    currentRequest.responseType = 'json';
    currentRequest.send();
    currentRequest.onload = function() {
        var weatherObj = currentRequest.response;
        document.getElementById("tommy-weather-current-temp").innerHTML = Math.round(weatherObj.main.temp) + "&#176F";
	document.getElementById("tommy-weather-current-img").src = "icons/" + weatherObj.weather[0].icon + ".png";
        document.getElementById("tommy-weather-current-desc").innerHTML = capitalizeFirstLetter(weatherObj.weather[0].description);
        document.getElementById("tommy-weather-current-wind").innerHTML = "Wind speed: " + (weatherObj.wind.speed + " mph");
    }

    var forecastRequestURL = 'http://api.openweathermap.org/data/2.5/forecast?id=5375480&units=imperial&appid=5b90c7fcc89098335ea9a9b9b3ded432&format=json';
    var forecastRequest = new XMLHttpRequest();
    forecastRequest.open('GET', forecastRequestURL);
    forecastRequest.responseType = 'json';
    forecastRequest.send();
    forecastRequest.onload = function() {
        var weatherObj = forecastRequest.response;
	for (i = 0; i < 4; i++) {
            document.getElementById("tommy-weather-forecast-" + (i+1) + "-img").src = "icons/" + weatherObj.list[i].weather[0].icon + ".png";
            document.getElementById("tommy-weather-forecast-" + (i+1) + "-temp").innerHTML = Math.round(weatherObj.list[i].main.temp) + "&#176F";
	    var forecast1time = moment.utc(weatherObj.list[i].dt_txt).tz('America/Los_Angeles').format('ha');
            document.getElementById("tommy-weather-forecast-" + (i+1) + "-time").innerHTML = forecast1time;
	}
    }
}

function leslieWeatherLoad() {
    var currentRequestURL = 'http://api.openweathermap.org/data/2.5/weather?id=5391959&units=imperial&appid=5b90c7fcc89098335ea9a9b9b3ded432&format=json';
    var currentRequest = new XMLHttpRequest();
    currentRequest.open('GET', currentRequestURL);
    currentRequest.responseType = 'json';
    currentRequest.send();
    currentRequest.onload = function() {
        var weatherObj = currentRequest.response;
        document.getElementById("leslie-weather-current-temp").innerHTML = Math.round(weatherObj.main.temp) + "&#176F";
	document.getElementById("leslie-weather-current-img").src = "icons/" + weatherObj.weather[0].icon + ".png";
        document.getElementById("leslie-weather-current-desc").innerHTML = capitalizeFirstLetter(weatherObj.weather[0].description);
        document.getElementById("leslie-weather-current-wind").innerHTML = "Wind speed: " + (weatherObj.wind.speed + " mph");
    }

    var forecastRequestURL = 'http://api.openweathermap.org/data/2.5/forecast?id=5391959&units=imperial&appid=5b90c7fcc89098335ea9a9b9b3ded432&format=json';
    var forecastRequest = new XMLHttpRequest();
    forecastRequest.open('GET', forecastRequestURL);
    forecastRequest.responseType = 'json';
    forecastRequest.send();
    forecastRequest.onload = function() {
        var weatherObj = forecastRequest.response;
	for (i = 0; i < 4; i++) {
            document.getElementById("leslie-weather-forecast-" + (i+1) + "-img").src = "icons/" + weatherObj.list[i].weather[0].icon + ".png";
            document.getElementById("leslie-weather-forecast-" + (i+1) + "-temp").innerHTML = Math.round(weatherObj.list[i].main.temp) + "&#176F";
	    var forecast1time = moment.utc(weatherObj.list[i].dt_txt).tz('America/Los_Angeles').format('ha');
            document.getElementById("leslie-weather-forecast-" + (i+1) + "-time").innerHTML = forecast1time;
	}
    }
}

// 511 Transit API

function tommyTransitLoad() {
    var directionsService = new google.maps.DirectionsService;
    var request = {
        origin: 'San Francisco Caltrain, 4th St, San Francisco, CA, USA',
        destination: 'Mountain View Caltrain Station, Mountain View, CA, USA',
        travelMode: 'TRANSIT',
	transitOptions: {
	    modes: ['TRAIN'],
	},
	unitSystem: google.maps.UnitSystem.IMPERIAL,
	provideRouteAlternatives: true
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
	    for (i = 0; i < 3; i++) {
	        document.getElementById("tommy-transit-" + (i+1) + "-etd").innerHTML = calculateCountdown(result.routes[i].legs[0].steps[0].transit.departure_time.value);
		var transitName = result.routes[i].legs[0].steps[0].transit.line.name;
		if (result.routes[i].legs[0].steps[0].transit.line.name == undefined) {
			transitName = result.routes[i].legs[0].steps[0].transit.line.short_name;
		}
	        document.getElementById("tommy-transit-" + (i+1) + "-img").src = "icons/" + transitName + ".png";
	        document.getElementById("tommy-transit-" + (i+1) + "-name").innerHTML = transitName;
	        document.getElementById("tommy-transit-" + (i+1) + "-eta").innerHTML = "Arrival: " + result.routes[i].legs[0].steps[0].transit.arrival_time.text;
	    }
        }
    });
}

function leslieTransitLoad() {
    var directionsService = new google.maps.DirectionsService;
    var request = {
        origin: '2nd & King, San Francisco, CA 94107, United States',
        destination: 'Metro Van Ness Station, San Francisco, CA 94103, USA',
        travelMode: 'TRANSIT',
	transitOptions: {
	    modes: ['TRAM'],
	},
	unitSystem: google.maps.UnitSystem.IMPERIAL,
	provideRouteAlternatives: true
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
	    for (i = 0; i < 3; i++) {
	        document.getElementById("leslie-transit-" + (i+1) + "-etd").innerHTML = calculateCountdown(result.routes[i].legs[0].steps[1].transit.departure_time.value);
		var transitName = result.routes[i].legs[0].steps[1].transit.line.short_name + " " + result.routes[i].legs[0].steps[1].transit.line.name;
	        document.getElementById("leslie-transit-" + (i+1) + "-img").src = "icons/muni.png";
	        document.getElementById("leslie-transit-" + (i+1) + "-name").innerHTML = transitName;
	        document.getElementById("leslie-transit-" + (i+1) + "-eta").innerHTML = "Arrival: " + result.routes[i].legs[0].steps[1].transit.arrival_time.text;
	    }
        }
    });
}

