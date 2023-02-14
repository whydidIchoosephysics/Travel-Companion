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