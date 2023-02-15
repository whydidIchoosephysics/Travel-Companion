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
      const eventsArea = $("#events");
      console.log(json);
      // create Card Elements
      let eventName = json.name;

      let ticketLink = JSON.stringify(json.url);
      console.log(ticketLink);

      let imageLink = json.images[0].url;

      let cardContainer = $("<div>");
      cardContainer.addClass("cardContainer col-lg-3 col-md-3 col-sm-12");

      let card = $("<div>");
      card.addClass("card");

      let cardBody = $("<div>");
      cardBody.addClass("card-body");

      let cardImage = $("<img>");
      cardImage.attr("src", imageLink);
      cardImage.addClass("card-img-top small-card-image");

      let cardTitle = $("<h3>").text(eventName);
      cardTitle.addClass("card-title");

      let cardText = $("<p>").text("Event 1");
      cardText.addClass("card-text");

      let cardButton = $("<a>").text("See more");
      cardButton.addClass("btn btn-primary");

      // Create card structure
      cardBody.append(cardImage, cardTitle, cardText, cardButton);
      card.append(cardBody);
      cardContainer.append(card);

      // Add card to Page Area
      $("#eventCards").append(cardContainer);
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
    console.log("Events checkbox is unchecked.");
  }
});
