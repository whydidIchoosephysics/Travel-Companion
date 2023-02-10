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


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 819adGeqBu-wcCONjR2MfPzxN1xl0hSyKdoH3_VHe4DlQsczZAJd5iUlru4Zzzs_aLiA-IU3m0OgtJMbfxx_nKUq-jBdr0jLauzxH5L2YnXDQdmjWNhN66CK70XlY3Yx'
  }
};

fetch('https://api.yelp.com/v3/businesses/search?latitude=' + latitude + '&longitude=' + longitude + '&term=restaurants&radius= ' + range + '&sort_by=best_match&limit=5', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));