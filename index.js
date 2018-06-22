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
    console.log(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
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
        document.getElementById("leslie-weather-current-desc").innerHTML = weatherObj.weather[0].description;
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
    var requestURL = 'http://api.511.org/transit/StopMonitoring?api_key=bd4b1c1e-7e9e-4a4f-a3b5-80f7c8ad4aea&agency=CT&stopCode=70012&format=json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var transit = request.response;
        var transitJSON = JSON.stringify(transit);
        document.getElementById("tommy-transit").innerHTML = transitJSON;
    }
}

function leslieTransitLoad() {
    var requestURL = 'http://api.511.org/transit/StopMonitoring?api_key=bd4b1c1e-7e9e-4a4f-a3b5-80f7c8ad4aea&agency=SF&stopCode=15237&format=json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var transit = request.response;
        var transitJSON = JSON.stringify(transit);
        document.getElementById("leslie-transit").innerHTML = transitJSON;
    }
}

