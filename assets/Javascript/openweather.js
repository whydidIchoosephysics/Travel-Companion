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