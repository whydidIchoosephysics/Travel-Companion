// Geolocation API
const buttonLocation = $("#getloc");
const locationArea = $("#current-coords");

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, currentLocErrors);
  } else {
    locationArea.text("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);

  locationArea.text(
    "Latitude: " +
      position.coords.latitude +
      "  Longitude: " +
      position.coords.longitude
  );
}

// Shows the error given by the browser in case Lcoation Data can't be accessed
function currentLocErrors(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationArea.text("User denied the request for Geolocation.");
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      locationArea.text("Location information is unavailable.");
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      locationArea.text("The request to get user location timed out.");
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      locationArea.text("An unknown error occurred.");
      console.log("An unknown error occurred.");
      break;
  }
}

// When Button to Get Current Location is pressed the function to get the data is being run
buttonLocation.on("click", function (event) {
  getCurrentLocation();
});
