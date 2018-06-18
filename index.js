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

// OpenWeatherMap Weather API
function tommyWeatherLoad() {
    var requestURL = 'http://api.openweathermap.org/data/2.5/forecast?id=5375480&appid=5b90c7fcc89098335ea9a9b9b3ded432&format=json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var weather = request.response;
        var weatherJSON = JSON.stringify(weather);
        document.getElementById("tommy-weather").innerHTML = weatherJSON;
    }
}

function leslieWeatherLoad() {
    var requestURL = 'http://api.openweathermap.org/data/2.5/forecast?id=5391959&appid=5b90c7fcc89098335ea9a9b9b3ded432&format=json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var weather = request.response;
        var weatherJSON = JSON.stringify(weather);
        document.getElementById("leslie-weather").innerHTML = weatherJSON;
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

