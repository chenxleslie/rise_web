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
    var requestURL = 'http://api.511.org/transit/StopMonitoring?api_key=bd4b1c1e-7e9e-4a4f-a3b5-80f7c8ad4aea&agency=CT&format=json';
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
    var requestURL = 'http://api.511.org/transit/StopMonitoring?api_key=bd4b1c1e-7e9e-4a4f-a3b5-80f7c8ad4aea&agency=AC&format=json';
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

