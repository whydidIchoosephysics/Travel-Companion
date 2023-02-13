let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = $(".mySlides");
  let dots = $(".dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Geolocation API
const buttonLocation = $("#current-loc-button");
const locationArea = $("#show-coords");

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

  let curLoc = $("<h5>").text(
    "Latitude: " +
      position.coords.latitude +
      "  Longitude: " +
      position.coords.longitude
  );
  locationArea.append(curLoc);
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

// // When Button to Get Current Location is pressed the function to get the data is being run
// buttonLocation.on("click", function (event) {
//   event.preventDefault();
//   getCurrentLocation();
// });

//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += "active";
//   setTimeout(showSlides, 2000); // Change image every 2 seconds

let form = $("#form");

let submitBtn = $("#submit");

submitBtn.on("click", function (event) {
  event.preventDefault();
  let cityName = $("#userCityInput").val().trim();
  let startDate = $("#userStartDate").val().trim();
  let endDate = $("#userEndDate").val().trim();
  let range = $("#formLocationRange").val();

  console.log(cityName);
  console.log(startDate);
  console.log(endDate);
  console.log(range);

  restaurantInfo(cityName, range);
});

function cityNameToCoordinates() {}

function restaurantInfo(city, range) {
  let urlCity =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1&appid=166a433c57516f51dfab1f7edaed8413";

  $.ajax({
    url: urlCity,
    method: "GET",
  }).then(function (promise) {
    let lat = promise[0].lat.toFixed(3);
    let lon = promise[0].lon.toFixed(3);

    console.log(lat, lon);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer 819adGeqBu-wcCONjR2MfPzxN1xl0hSyKdoH3_VHe4DlQsczZAJd5iUlru4Zzzs_aLiA-IU3m0OgtJMbfxx_nKUq-jBdr0jLauzxH5L2YnXDQdmjWNhN66CK70XlY3Yx",
      },
    };

    fetch(
      "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" +
        lat +
        "&longitude=" +
        lon +
        "&term=restaurants&radius= " +
        range +
        "&sort_by=best_match&limit=5",
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  });
}
