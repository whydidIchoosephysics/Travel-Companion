const ticketmasterKey = "MwYYGqDzXc2DG7lbU0nTvjF0f0KBU9Aj";
const eventsArea = $("#events");
let currentCoordinates = "";
// const buttonLocation = $("#current-loc-button");

function getEventData(lat, lon, ran) {
  let apiKey = ticketmasterKey;
  let typeofEvent = "/discovery/v2/attractions";
  let numberofEvents = "5";
  let latitude = "53.483959";
  let longitude = "-2.244644";
  let latlon = latitude + "," + longitude;
  let range = 100;

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

      let eventName = promise._embedded.attractions[0].name;
      let ID = promise._embedded.attractions[0].id;
      let imageURL = promise._embedded.attractions[0].images[1];

      console.log(promise._embedded.attractions[0]);
      console.log(eventName);
      console.log(ID);
      console.log(imageURL);
    })
    .catch(function (xhr, status, err) {});
}

function createCard() {
  // Create card elements
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
});
