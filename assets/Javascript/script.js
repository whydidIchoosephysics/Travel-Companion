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
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += "active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

  let form = $("#form");
  
  let submitBtn = $("#submit");

  submitBtn.on("click",function(event){   
    event.preventDefault();
    let cityName = $("#userCityInput").val().trim();
    let startDate = $("#userStartDate").val().trim();
    let endDate = $("#userEndDate").val().trim();
    let range = $("#formLocationRange").val();
    
    console.log(cityName);
    console.log(startDate);
    console.log(endDate);
    console.log(range);
  });

  
