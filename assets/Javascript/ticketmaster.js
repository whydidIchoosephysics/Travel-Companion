const ticketmasterKey = "MwYYGqDzXc2DG7lbU0nTvjF0f0KBU9Aj";

const buttonEvents = $("#search-events");

function getEventData() {
  let apiKey = ticketmasterKey;
  let typeofEvent = "/discovery/v2/attractions";
  let numberofEvents = "5";
  $.ajax({
    type: "GET",
    url:
      "https://app.ticketmaster.com" +
      typeofEvent +
      ".json?size=" +
      numberofEvents +
      "&apikey=" +
      apiKey,
    async: true,
    dataType: "json",
  }).then(function (promise) {
    console.log("Ticketmaster sent you data");
    console.log(promise);
    // Parse the response.
    // Do other things.
  });
  // .catch(function (xhr, status, err) {
  //   // This time, we do not end up here!
  // });
}

buttonEvents.on("click", function (event) {
  getEventData();
});
