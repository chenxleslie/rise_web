// Client ID and API key from the Developer Console
var CLIENT_ID = ['427299125874-ipno9ilajmv8iqhp7e4j226u9f8lr2v9.apps.googleusercontent.com', '427299125874-n271sv10pi9o2lq643jtm1c5t3h2fk85.apps.googleusercontent.com'];
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var ACCOUNT = ['tommy@quora.com','lchen@squareup.com'];
var COLOR = ['rgba(207,104,102,100)','rgba(62,142,236,100)']

var accessToken = "";
var idToken = "";

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
function handleClientLoad1() {
    clearTable("calendar-table-1");
    gapi.load('client:auth2', function(){
        gapi.auth2.authorize({
            client_id: CLIENT_ID[0],
            scope: SCOPES,
            response_type: 'id_token permission',
            login_hint: ACCOUNT[0],
            prompt: 'none',
        }, function(response) {
            if (response.error) {
                // An error happened!
                console.log("error");
                return;
            }
            // The user authorized the application for the scopes requested.
            console.log("authorized");
            accessToken = response.access_token;
            idToken = response.id_token;
            console.log(response);
            // You can also now use gapi.client to perform authenticated requests.
            listUpcomingEvents(1);
        });
    })
};

function handleClientLoad2() {
    clearTable("calendar-table-2");
    gapi.load('client:auth2', function(){
        gapi.auth2.authorize({
            client_id: CLIENT_ID[1],
            scope: SCOPES,
            response_type: 'id_token permission',
            login_hint: ACCOUNT[1],
            prompt: 'none',
        }, function(response) {
            if (response.error) {
                // An error happened!
                console.log("error");
                return;
            }
            // The user authorized the application for the scopes requested.
            console.log("authorized");
            accessToken = response.access_token;
            idToken = response.id_token;
            console.log(response);
            // You can also now use gapi.client to perform authenticated requests.
            listUpcomingEvents(2);
        });
    })
};
/**
* Print the summary and start datetime/date of the next ten events in
* the authorized user's calendar. If no events are found an
* appropriate message is printed.
*/
function listUpcomingEvents(count) {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
    }).then(function () {
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': today.toISOString(),
            'timeMax': tomorrow.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 20,
            'orderBy': 'startTime'
        }).then(function(response) {
            document.getElementById('calendar-name-' + count).innerHTML = "<span style=\'color: " + COLOR[count - 1] + "\'>" + response.result.summary + "</span>";
            var events = response.result.items;
            var calendarTable = document.getElementById("calendar-table-" + count);
            if (events.length > 0) {
                for (i = 0; i < events.length; i++) {
                    var event = events[i];
                    var row = calendarTable.insertRow(i);
                    var timeColumn = row.insertCell(0);
                    var descColumn = row.insertCell(1);
                    timeColumn.style.borderRight = "3px solid " + COLOR[count - 1];
                    timeColumn.innerHTML = "<p class='small normal' align='right'>" + moment.utc(event.start.dateTime).tz('America/Los_Angeles').format('h:mma') + "</p><p class='small' align='right'>" + moment.utc(event.end.dateTime).tz('America/Los_Angeles').format('h:mma') + "</p>";
                    descColumn.innerHTML = event.summary;
                }
            } else {
                document.getElementById('content-'+ count).style.display = 'block';
                document.getElementById('content-'+ count).innerHTML = 'No events today!';
            }
        });
    })
};

function clearTable(tableId) {
    for(var i = document.getElementById(tableId).rows.length; i > 0; i--) {
        document.getElementById(tableId).deleteRow(i - 1);
    }
}
