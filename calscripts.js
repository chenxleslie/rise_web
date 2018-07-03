      // Client ID and API key from the Developer Console
      var CLIENT_ID_1 = '427299125874-ipno9ilajmv8iqhp7e4j226u9f8lr2v9.apps.googleusercontent.com';
      var CLIENT_ID_2 = '427299125874-n271sv10pi9o2lq643jtm1c5t3h2fk85.apps.googleusercontent.com';
      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
      var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
      var ACCOUNT_1 = 'chenxleslie@gmail.com';
      var ACCOUNT_2 = 'lchen@squareup.com';

      var accessToken1 = "";
      var idToken1 = "";

      var accessToken2 = "";
      var idToken2 = "";

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function handleClientLoad1() {
        gapi.load('client:auth2', function(){
	gapi.auth2.authorize({
	  client_id: CLIENT_ID_1,
	  scope: SCOPES,
	  response_type: 'id_token permission',
          login_hint: ACCOUNT_1,
	  prompt: 'none',
	}, function(response) {
	  if (response.error) {
	    // An error happened!
	    console.log("error");
	    return;
	  }
	  // The user authorized the application for the scopes requested.
	  console.log("authorized");
	  accessToken1 = response.access_token;
	  idToken1 = response.id_token;
	  console.log(response);
	  // You can also now use gapi.client to perform authenticated requests.
	  listUpcomingEvents1();
	});
     })};

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents1() {
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
        }).then(function () {
		gapi.client.calendar.events.list({
		  'calendarId': 'primary',
		  'timeMin': (new Date()).toISOString(),
		  'showDeleted': false,
		  'singleEvents': true,
		  'maxResults': 10,
		  'orderBy': 'startTime'
		}).then(function(response) {
		  var events = response.result.items;
		  var calendarTable = document.getElementById("tommy-calendar-table");
		  if (events.length > 0) {
		    for (i = 0; i < events.length; i++) {
		      var event = events[i];
		      var row = calendarTable.insertRow(i);
		      var timeColumn = row.insertCell(0);
		      var descColumn = row.insertCell(1);
		      timeColumn.innerHTML = moment.utc(event.start.dateTime).tz('America/Los_Angeles').format('h:mma') + " " + moment.utc(event.end.dateTime).tz('America/Los_Angeles').format('h:mma'); 
		      descColumn.innerHTML = event.summary;
		    }
		  } else {
		    document.getElementById('content-1').innerHTML = 'No upcoming events found.';
		  }
		});
	      })
      };
      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function handleClientLoad2() {
	gapi.auth2.authorize({
	  client_id: CLIENT_ID_2,
	  scope: SCOPES,
	  response_type: 'id_token permission',
          login_hint: ACCOUNT_2,
	  prompt: 'none'
	}, function(response) {
	  if (response.error) {
	    // An error happened!
	    console.log("error");
	    return;
	  }
	  // The user authorized the application for the scopes requested.
	  accessToken2 = response.access_token;
	  idToken2 = response.id_token;
	  console.log("second call");
	  // You can also now use gapi.client to perform authenticated requests.
	  listUpcomingEvents2();
	});
     };

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents2() {
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
        }).then(function () {
		gapi.client.calendar.events.list({
		  'calendarId': 'primary',
		  'timeMin': (new Date()).toISOString(),
		  'showDeleted': false,
		  'singleEvents': true,
		  'maxResults': 10,
		  'orderBy': 'startTime'
		}).then(function(response) {
		  var events = response.result.items;
		  var calendarTable = document.getElementById("leslie-calendar-table");
		  if (events.length > 0) {
		    for (i = 0; i < events.length; i++) {
		      var event = events[i];
		      var row = calendarTable.insertRow(i);
		      var timeColumn = row.insertCell(0);
		      var descColumn = row.insertCell(1);
		      timeColumn.innerHTML = event.start.dateTime + " " + event.end.dateTime; 
		      descColumn.innerHTML = event.summary;
		    }
		  } else {
		    document.getElementById('content-2').innerHTML = 'No upcoming events found.';
		  }
		});
	      })
      }
