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


