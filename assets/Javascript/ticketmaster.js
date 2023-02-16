const ticketmasterKey = "aikirkRksdSnXbNYnM6Juu7rGL6kxPwo";
const eventsArea = $("#eventCards");
let currentCoordinates = "";

function getEventData(lat, lon) {
  let apiKey = ticketmasterKey;
  let typeofEvent = "/discovery/v2/events";
  let numberofEvents = "5";
  let latitude = lat;
  let longitude = lon;
  let latlon = latitude + "," + longitude;
  let range = 1000;
  eventsArea.empty();

  $.ajax({
    type: "GET",
    url:
      "https://app.ticketmaster.com" +
      typeofEvent +
      ".json?size=" +
      numberofEvents +
      "&apikey=" +
      apiKey +
      "&latlong=" +
      latlon,
    async: true,
    dataType: "json",
  })
    .then(function (promise) {
      console.log("Ticketmaster sent you data");
      console.log(promise);

      // Populate cards

      let eventName = promise._embedded.events[0].name;
      let ID = promise._embedded.events[0].id;
      let imageURL = promise._embedded.events[0].images[1].url;

      let idArrays = promise._embedded.events;

      // console.log(promise._embedded.events[0]);
      console.log(eventName);
      console.log(ID);
      console.log(promise._embedded.events);
  
      //clear data before appending 
      $("#events").empty();

      const eventArea = $("#events");

      let containerDiv = $("<div>");
      containerDiv.addClass("container-fluid");
      eventArea.append(containerDiv);
    
      let rowDiv = $("<div>");
      rowDiv.addClass("row");
      rowDiv.attr("id", "eventRow");
      containerDiv.append(rowDiv);
    
      let titleDiv = $("<div>");
      titleDiv.addClass("col-12");
      rowDiv.append(titleDiv);
    
      let sectionTitle = $("<div>");
      sectionTitle.addClass("section-title");
      titleDiv.append(sectionTitle);
    
      let eventTitle = $("<h2>");
      eventTitle.append("Events");
    
      let lineDiv = $("<div>");
      lineDiv.addClass("line");
    
      sectionTitle.append(eventTitle);
      sectionTitle.append(lineDiv);

      for (var i = 0; i < promise._embedded.events.length; i++) {
        idShowInfo(promise._embedded.events[i].id);
        console.log(promise._embedded.events[i].id);
      }
    })
    .catch(function (xhr, status, err) {});
}

function idShowInfo(eventID) {
  const eventUrl = `https://app.ticketmaster.com/discovery/v2/events/${eventID}.json?apikey=${ticketmasterKey}`;

  $.ajax({
    type: "GET",
    url: eventUrl,
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json);

      // create Card Elements
      let eventName = json.name;

      let ticketLink = json.url;
      console.log(ticketLink);

      let imageLink = json.images[0].url;

      let eventDate = json.dates.start.localDate;

      let eventTime = json.dates.start.localTime;

      let venueName = json._embedded.venues[0].name;

      let cardContainer = $("<div>");
      cardContainer.addClass("cardContainer col-lg-3 col-md-3 col-sm-12");

      let card = $("<div>");
      card.addClass("card w-auto");

      let cardBody = $("<div>");
      cardBody.addClass("card-body d-flex flex-column");

      let cardImage = $("<img>");
      cardImage.attr("src", imageLink);
      cardImage.addClass("card-img-top small-card-image");

      let cardTitle = $("<h5>").text(eventName);
      cardTitle.addClass("card-title");

      let cardText = $("<p>").text(venueName);
      cardText.addClass("card-text");

      let date = $("<p>").text(eventDate);

      let time = $("<p>").text(eventTime);

      let cardButton = $("<a>").text("Get tickets");
      cardButton.addClass("btn btn-outline-secondary mt-auto btn-sm");
      cardButton.attr({
        href: ticketLink,
        target: "_blank",
      });

      // Create card structure
      cardBody.append(cardTitle, cardText, date, time, cardButton);
      card.append(cardImage);
      card.append(cardBody);
      cardContainer.append(card);

      // Add card to Page Area
      $("#eventRow").append(cardContainer);
    },
    error: function (xhr, status, err) {
      // This time, we do not end up here!
      console.log(err);
    },
  });
}

function cityNameToCoordinates(cityName) {
  const apiKey = "ec5505d77c6eea9afb6162e232ff043c";

  let urlCity =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1&appid=" +
    apiKey;

  $.ajax({
    url: urlCity,
    method: "GET",
  }).then(function (promise) {
    console.log(promise);

    let lat = promise[0].lat.toFixed(3);
    let lon = promise[0].lon.toFixed(3);
    let city = cityName;

    console.log(lat, lon);

    getEventData(lat, lon);
  });
}

submitBtn.on("click", function (event) {
  let cityName = $("#userCityInput").val().trim();

  if ($("#isEventSelected").is(":checked")) {
    console.log("Checkbox is checked.");
    cityNameToCoordinates(cityName);
  } else {
    $("#events").empty();
    console.log("Events checkbox is unchecked.");
  }
});
