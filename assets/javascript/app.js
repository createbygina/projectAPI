$(document).ready(function () {
  var lunch = {

    slideIndex: 1,
    cuisine: "",
    price: "",
    radius: 0,
    open: false,
    cuisineOptions: ["asian", "american", "mexican", "gluten-free", "vegetarian", "indian", "italian", "dessert"],
    priceOptions: [1, 2, 3, 4],
    radiusOptions: [8046, 3218, 1609, 402],

initMap: function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log(pos);
    })}},


    getLunch: function () {
      if ('#pick1') {
        var i = $('#pick1').val().trim();
        lunch.cuisine="&categories="+ lunch.cuisineOptions[i];
        console.log(lunch.cuisine)
      }
      if ('#pick2'==="Price $") {
        lunch.price = "";
      }
      else {
        var i=$('#pick2').val().trim();
        console.log("price "+ i);
        lunch.price=("&price=" + (lunch.priceOptions[i]))
        console.log(lunch.price);
      }      
      // {
      if ('#pick4'==="Distance") {
        lunch.radius="";
      }
      
      else{
        var i = $("#pick4").val()
        lunch.radius=("&radius="+(lunch.radiusOptions[i]))
        console.log(lunch.radius)
      }
      if ('#pick5') {
        var pick5= $('#pick5').val().trim();
      }
      let queryURL= "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=LosAngeles" + lunch.cuisine + lunch.price + lunch.radius + "&limit=10";

      console.log(queryURL);
      $.ajax({
        "url": queryURL,
        "method": "GET",
        "headers": {
          "Authorization": "Bearer S0WWk7FjtBiRBwAKcUlSEM21ieNrXSMfOW40A-d5nQmAXNVApE_9AsLrkfbSMt66JWI7c1_zlV43T75ZaWa8eQvbdM_NGlqQ_JDc3bTOuv6ML75_ip94vl2w1xmdXHYx",
        }
      }).then(function (response) {
        console.log(response);
      })
    },

    //  settings: {
    //   "async": true,
    //   "crossDomain": true,
    //   "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/WavvLdfdP6g8aZTtbBQHTw",
    //   "method": "GET",
    //   "headers": {
    //     "Authorization": "Bearer S0WWk7FjtBiRBwAKcUlSEM21ieNrXSMfOW40A-d5nQmAXNVApE_9AsLrkfbSMt66JWI7c1_zlV43T75ZaWa8eQvbdM_NGlqQ_JDc3bTOuv6ML75_ip94vl2w1xmdXHYx",
    //     "cache-control": "no-cache",
    //     "Postman-Token": "90f6bddd-d9a5-483b-a97b-049d8f49019a"
    //   }
    // },

    // ajaxfunction: function () {
    //   $.ajax(lunch.settings).done(function (response) {
    //     console.log(response);
    //   });
    // },

    // plusSlides: function (n) {
    //   showSlides(slideIndex += n);
    // },

    // currentSlide: function (n) {
    //   showSlides(slideIndex = n);
    // },

    // showSlides: function (n) {
    //   var i;
    //   var slides = document.getElementsByClassName("mySlides");
    //   var dots = document.getElementsByClassName("dot");
    //   if (n > slides.length) {
    //     lunch.slideIndex = 1
    //   }
    //   if (n < 1) {
    //     slideIndex = slides.length
    //   }
    //   for (i = 0; i < slides.length; i++) {
    //     slides[i].style.display = "none";
    //   }
    //   for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    //   }
    //   slides[lunch.slideIndex - 1].style.display = "block";
    //   dots[lunch.slideIndex - 1].className += " active";
    // },
  } //end lunch obj
  console.log('startup');
  // lunch.showSlides(lunch.slideIndex);

  $("#submit").on("click", function (event) {
    event.preventDefault()
    var search = $("#searchInput").val().trim()
    console.log("submit")
    console.log(search)
    lunch.initMap();
    lunch.getLunch();
  })

}); //end ready wrapper