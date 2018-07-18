// refresh all
function loadAll() {
    console.log(new Date() + " refresh");
    dateTimeLoad();
    tommyWeatherLoad();
    tommyTransitLoad();
    handleClientLoad1();
    leslieWeatherLoad();
    leslieTransitLoad();
    window.setTimeout(handleClientLoad2, 2000);
    timedRefresh();
    pageRefresh();
}

// refresh time and transit
function realtimeRefresh() {
    setInterval(function() {
        dateTimeLoad();
    }, 5000);
}

// refresh transit, delayed given API cost
function timedRefresh() {
    var startTime = new Date().getTime();
    var interval = setInterval(function() {
        if (new Date().getTime() - startTime > 2400000) {
            clearInterval(interval);
            document.getElementById("status").innerHTML = "Transit timed out."
            console.log('transit timed out');
            document.getElementById("tommy-transit-widget").style.display = 'none';
            document.getElementById("leslie-transit-widget").style.display = 'none';
            return;
        }
        else {
            console.log('transit refreshed');
            tommyTransitLoad();
            leslieTransitLoad();
        }
    },60000);
}

function pageRefresh() {
    var now = new Date();
    var refreshTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0);
    var refreshTimeDiff = refreshTime - now;
    if (refreshTimeDiff < 0) {
        refreshTimeDiff += 86400000; // it's after 10am, try 10am tomorrow.
    }
    console.log("millisTill: " + refreshTimeDiff);
    setTimeout(loadAll, refreshTimeDiff);
}

function dateTimeLoad() {
    var dateFormatted = moment().tz('America/Los_Angeles').format('dddd, MMMM Do YYYY');
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

    var timeFormatted = moment().tz('America/Los_Angeles').format('h:mma');
    document.getElementById("time").innerHTML = timeFormatted;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function calculateCountdown(string) {
    var departTime = new Date(string).getTime();
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
    var requestURL = 'http://api.511.org/transit/StopMonitoring?api_key=bd4b1c1e-7e9e-4a4f-a3b5-80f7c8ad4aea&agency=SF&stopCode=15237&format=json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        for (i = 0; i < 3; i++) {
            var transitObj = request.response;
            document.getElementById("leslie-transit-" + (i+1) + "-etd").innerHTML = calculateCountdown(transitObj.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit[i].MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime);
            document.getElementById("leslie-transit-" + (i+1) + "-img").src = "icons/muni.png";
            var transitName = transitObj.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit[i].MonitoredVehicleJourney.LineRef + " - " + transitObj.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit[i].MonitoredVehicleJourney.DirectionRef;
            document.getElementById("leslie-transit-" + (i+1) + "-name").innerHTML = transitName
            var arrivalTime = moment(transitObj.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit[i].MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime).add(18, 'm').tz('America/Los_Angeles').format('h:mma');
            document.getElementById("leslie-transit-" + (i+1) + "-eta").innerHTML = "Arrival: " + arrivalTime;
        }
    }
}
