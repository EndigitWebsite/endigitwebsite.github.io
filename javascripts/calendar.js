

var initCalendar = function() {
    console.log('Calendar Init');
    gapi.client.setApiKey('AIzaSyDrctoXMqp6K0gvDsMdHrqZZ55g-1Pm7Fk');
    loadCalendarApi();
}

function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

function listUpcomingEvents(){
    var request = gapi.client.calendar.events.list({
        'calendarId': 'endigit.com_fupucrtu0me0d7ki9nacv9jfbg@group.calendar.google.com',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'orderBy': 'startTime'
    })

    request.execute(function(resp) {
        var events = resp.items;
        var header = document.getElementById("events")
        console.log(header);
        var h3 = document.createElement("H3");
        var text = document.createTextNode("Upcoming Events2:")
        h3.appendChild(text);
        
        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];

              //Add Event to the Event List
              var eventsDiv = document.getElementById("events");
              var newEvent = document.createElement("div");
              newEvent.className = "event";
              eventsDiv.appendChild(newEvent);
              
              //Add Name to the Event
              var newEventName = document.createElement("div");
              newEventName.className = "eventName";
              newEvent.appendChild(newEventName);
              //Check the Event name/summary for a link ()
              nameArray = event.summary.split("link:");
              if (nameArray.length > 1){
                  newEventNameLink = makeLink(nameArray);
                  newEventName.appendChild(newEventNameLink);
              }
              else {
                var name = document.createTextNode(event.summary);
                newEventName.appendChild(name);
              }
              
              //Format Event Date/Time
              if (event.start.date){
                  var start = moment(event.start.date).format("MMMM DD");
                  var startDay = moment(event.start.date).dayOfYear();
                  var startMonth = moment(event.start.date).month();
                  var end = moment(event.end.date).subtract(1, 'days').format("MMMM DD");
                  var endDay = moment(event.end.date).subtract(1, 'days').dayOfYear();
                  var endMonth = moment(event.end.date).subtract(1, 'days').month();
                  if (startDay == endDay){
                      //All Day, 1 Day Event
                      var when = start;
                  } else {
                      //Multiple Day Event
                      if (startMonth == endMonth){
                        //Same Month
                        var when = start + ' - ' + moment(end).format("DD");
                      } else {
                        //Multiple Months
                        var when = start + ' - ' + end;
                      }
                  }
              } else {
                  var start = moment(event.start.dateTime).format("MMMM DD  h:mm");
    			  var end = moment(event.end.dateTime).format("h:mm A");
    			  var when = start + ' - ' + end;
              }
			  //Add Date/Time to the Event
			  var newEventDate = document.createElement("div");
              newEventDate.className = "eventDate";
              var whenNode = document.createTextNode(when);
              newEventDate.appendChild(whenNode);
              newEvent.appendChild(newEventDate);
              
              //Add Location to the Event
              var newEventLocation = document.createElement("div");
              newEventLocation.className = "eventLocation";
              newEvent.appendChild(newEventLocation);
              if(event.location){
                  //Check the Event location for a link
                  locationArray = event.location.split("link:");
                  if (locationArray.length > 1){
                      newEventLocationLink = makeLink(locationArray);
                      newEventLocation.appendChild(newEventLocationLink);
                  }
                  else {
                    var location = document.createTextNode(event.location);
                    newEventLocation.appendChild(location);
                  }
              }
              
              //Add Description to the Event
              var newEventDescription = document.createElement("div");
              newEventDescription.className = "eventDescription";
              newEvent.appendChild(newEventDescription);
              //Check the Event Description for a link
              if (event.description){
                  eventDescription = String(event.description);
                  descriptionArray = eventDescription.split("link:")
    			  if (descriptionArray.length > 1){
    			      newEventDescriptionLink = makeLink(descriptionArray);
    			      newEventDescription.appendChild(newEventDescriptionLink);
    			  }
    			  else {
    			    var desc = document.createTextNode(event.description);             
                    newEventDescription.appendChild(desc);
    			  }
              }
              if (i+1 != events.length){
                  split = document.createElement("hr");
                  eventsDiv.appendChild(split);
              }
            }
          } else {
            appendPre('No upcoming events found.');
          }
    })
}

// function appendPre(message) {
//     // 
//     var events = document.getElementById("events")
//     var newEvent = document.createElement("div");
//     newEvent.className = "event";
// 	var td = document.createElement("td");
// 	var txt = document.createTextNode(message);

// 	td.appendChild(txt);
// 	tr.appendChild(td);
// 	table.appendChild(tr);
// }

function makeLink(txt) {
    var element = document.createElement("a");
    element.innerHTML = txt[0];
    element.setAttribute('href', txt[1]);
    return element;
}

// function appendLink(txt,address) {
//     var table = document.getElementById("eventsTable")
//     var tr = document.createElement("tr");
// 	var td = document.createElement("td");
// 	var link = document.createElement("a");
// 	console.log(txt);
// 	console.log(address);
// 	console.log(link);
// 	link.setAttribute('href', address);

// 	td.appendChild(makeLink(txt));
// 	tr.appendChild(td);
// 	table.appendChild(tr);
// }
;
