function displayCityInfo() {

    // variables for testing (to be replaced)
    let long = -0.156800
    let lat = 51.520611
    let range = 1000
    let searchLimit = 2


    // Here we are building the URL we need to query the database
    let queryURL = "https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:" + long + ',' + lat + ',' + range + "&limit=" + searchLimit + "&apiKey=495c099f0ea7499888669a0f2652bf40"


    // Creating an AJAX call for the specific city 
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);

        //console log the name of the restaurant 
        console.log(response.features[0].properties.name)


    })
};

displayCityInfo()

//https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:

//-0.156800,51.520611,1000

//&limit=

//5

//&apiKey=495c099f0ea7499888669a0f2652bf40

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}