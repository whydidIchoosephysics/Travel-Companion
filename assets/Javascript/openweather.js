function createNavItem() {
  let navItem = $("<li>");
  navItem.addClass("nav-item");

  let navLink = $("<a>");
  navLink.addClass("nav-link js-scroll-trigger");
  navLink.attr("href", "#weather");
  navLink.text("Weather");
  navItem.append(navLink);
  $("#navbarUl").append(navItem);

}

function createCard() {
  // Create card elements
  const weatherArea = $("#weather");

  let containerDiv = $("<div>");
  containerDiv.addClass("container-fluid");
  weatherArea.append(containerDiv);

  let rowDiv = $("<div>");
  rowDiv.addClass("row");
  rowDiv.attr("id", "weatherRow");
  containerDiv.append(rowDiv);

  let titleDiv = $("<div>");
  titleDiv.addClass("col-12");
  rowDiv.append(titleDiv);

  let sectionTitle = $("<div>");
  sectionTitle.addClass("section-title");
  titleDiv.append(sectionTitle);

  let weatherTitle = $("<h3>");
  weatherTitle.append("Weather");

  let lineDiv = $("<div>");
  lineDiv.addClass("line");

  sectionTitle.append(weatherTitle);
  sectionTitle.append(lineDiv);
}

function displayCoordinats() {
  let city = $("#userCityInput").val();
  let APIKey = "166a433c57516f51dfab1f7edaed8413";
  let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    let latitude = response.city.coord.lat;
    let longitude = response.city.coord.lon;
    console.log(latitude);
    console.log(longitude);
    displayCityInfo();

    function displayCityInfo() {
      let lat = latitude;
      let lon = longitude;
      console.log(lat);
      console.log(lon);

      // Add your own API key between the ""
      let APIKey = "166a433c57516f51dfab1f7edaed8413";

      // Here we are building the URL we need to query the database
      let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon + "&cnt=16&units=metric&appid=" + APIKey;

      // Creating an AJAX call for the specific movie button being clicked
      $.ajax({
        url: weatherUrl,
        method: "GET"
      }).then(function (response) {
          console.log(response);

          //clear data before appending 
          $("#navbarUl").empty();
          $("#weather").empty();
          
          let navItem = $("<li>");
          navItem.addClass("nav-item");

          let navLink = $("<a>");
          navLink.addClass("nav-link js-scroll-trigger");
          navLink.attr("href", "#page-top");
          navLink.text("Home");
          navItem.append(navLink);

          $("#navbarUl").append(navItem);
                
          createNavItem();
          createCard();
          let rowDiv = $("#weatherRow");
          let startDate = new Date($("#date_picker1").val().trim());
          let endDate = new Date($("#date_picker2").val().trim());
          let filteredDates = filterDate(response.list, startDate, endDate);
          if (filteredDates.length == 0) {
            //printar mensagem
            forecastErrorMessage();
          } else {
            for (i = 0; i < filteredDates.length; i++) {

              let cardContainer = $("<div>");
              cardContainer.addClass("cardContainer col-lg-2 col-md-2 col-sm-12");
              rowDiv.append(cardContainer);

              let card = $("<div>");
              card.addClass("card");
              card.attr("id", "weatherCard" + [i]);
              cardContainer.append(card);

              let cityDivInfo = $("#weatherCard" + [i]);

              let date = new Date(filteredDates[i].dt * 1000).toLocaleDateString("en-US");
              console.log(date);
              let cityName = $("<h5 style='text-align: center'>").text(response.city.name + " " + date);
              cityDivInfo.append(cityName);
              console.log(cityName);

              let currentIcon = filteredDates[i].weather[0].icon;
              let weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + currentIcon + ".png");
              cityDivInfo.append(weatherIcon);
              console.log(weatherIcon);

              let temp = filteredDates[i].temp.day;
              let pOne = $("<p>").text("Temperature: " + temp + " °C");
              cityDivInfo.append(pOne);
              console.log(pOne);

              let wind = filteredDates[i].speed;
              let pTwo = $("<p>").text("Wind: " + wind + " KPH");
              cityDivInfo.append(pTwo);
              console.log(pTwo);

              let humidity = filteredDates[i].humidity;
              let pThree = $("<p>").text("Humidity: " + humidity + " %");
              cityDivInfo.append(pThree);
              console.log(pThree);
            }
          }
      });
    };
  });
};

submitBtn.on("click", function (event) {
  event.preventDefault();
  if ($('#isWeatherSelected').is(':checked')) {
    console.log("Checkbox is checked.");
    displayCoordinats();
  }
  else {
    $("#navbarUl").empty();
    $("#weather").empty();
          
    let navItem = $("<li>");
    navItem.addClass("nav-item");

    let navLink = $("<a>");
    navLink.addClass("nav-link js-scroll-trigger");
    navLink.attr("href", "#page-top");
    navLink.text("Home");
    navItem.append(navLink);

    $("#navbarUl").append(navItem);
    console.log("Checkbox is unchecked.");
  }
});

//if (startDate == moment)
function diffDays(startDate, endDate) { //calculate the number of days between two dates
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function filterDate(weatherList, startDate, endDate) { //get target gap between two dates
  let filteredDates = [];
  let firstDateIndex = diffDays(new Date(), startDate);
  let lastDateIndex = diffDays(startDate, endDate) + firstDateIndex;

  for (i = firstDateIndex; i <= lastDateIndex && i < weatherList.length; i++) {
    filteredDates.push(weatherList[i]);
  }

  return filteredDates;
}

function forecastErrorMessage() {
  createNavItem();
  createCard();

  let errorMessage = $("<div>");
  errorMessage.addClass("cardContainer col-lg-12 col-md-12 col-sm-12");
    
  let errorText = $("<h3>");
  errorText.text("sorry impossible to get forecast for this trip");
  errorMessage.append(errorText);
  $("#weatherRow").append(errorMessage);
}