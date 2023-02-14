const ticketmasterKey = "aikirkRksdSnXbNYnM6Juu7rGL6kxPwo";
const eventsArea = $("#events");
let currentCoordinates = "";
// const buttonLocation = $("#current-loc-button");

function getEventData(lat, lon, ran) {
  let apiKey = ticketmasterKey;
  let typeofEvent = "/discovery/v2/events";
  let numberofEvents = "5";
  let latitude = "51.507";
  let longitude = "-0.1276";
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

// Not Working
// function getEventInfo() {
//   let apiKey = ticketmasterKey;
//   let Id = "K8vZ91756F0";

//   $.ajax({
//     type: "GET",
//     // url:
//     //   "https://app.ticketmaster.com/discovery/v2/events/" +
//     //   Id +
//     //   ".json?apikey=" +
//     //   apiKey,
//     url: "https://app.ticketmaster.com/discovery/v2/events/G5djZ97WU4Ozh.json?locale=en?apikey=aikirkRksdSnXbNYnM6Juu7rGL6kxPwo",
//     async: true,
//     dataType: "json",
//   }).then(function (promise) {
//     console.log("Ticketmaster sent you data");
//     console.log(promise);

//     // Populate cards

//     let eventName = promise._embedded.attractions[0].name;

//     console.log(promise._embedded.attractions[0]);
//     console.log(eventName);
//   });
// }

function createCard(eventInfo) {
  // let eventName = eventInfo.  // Create card elements

  let cardContainer = $("<div>");
  cardContainer.addClass("cardContainer col-lg-3 col-md-3 col-sm-12");

  let card = $("<div>");
  card.addClass("card");

  let cardBody = $("<div>");
  cardBody.addClass("card-body");

  let cardTitle = $("<h3>").text("Event 1");
  cardTitle.addClass("card-title");

  let cardText = $("<p>").text("Event 1");
  cardText.addClass("card-text");

  let cardButton = $("<a>").text("See more");
  cardButton.addClass("btn btn-primary");

  // Create card structure
  cardBody.append(cardTitle, cardText, cardButton);
  card.append(cardBody);
  cardContainer.append(card);

  // Add card to Page Area
  eventsArea.append(cardContainer);
}

buttonLocation.on("click", function (event) {
  getEventData();
  // getEventInfo();
  createCard();
});

// const eventID = "G5djZ97WU4Ozh";

function idShowInfo(eventID) {
  const eventUrl = `https://app.ticketmaster.com/discovery/v2/events/${eventID}.json?apikey=${ticketmasterKey}`;

  $.ajax({
    type: "GET",
    url: eventUrl,
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json);
      createCard(json);
    },
    error: function (xhr, status, err) {
      // This time, we do not end up here!
      console.log(err);
    },
  });
}
