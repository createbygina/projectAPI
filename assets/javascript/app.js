var pos;
var a;
var b;
var c;
var d;
var e;
var f;
var g;
var h;

$(document).ready(function () {

  var lunch = {

    slideIndex: 1,
    cuisine: "",
    price: "",
    radius: "",
    open: false,
    cuisineOptions: ["asian", "american", "mexican", "gluten-free", "vegetarian", "indian", "italian", "dessert"],
    priceOptions: [1, 2, 3, 4],
    radiusOptions: [8046, 3218, 1609, 402],
    search: "",

    initMap: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log("pos " + pos + pos.lat + pos.lng);
        })
      }
    },
    // openNewWindow: function () {
    //   window.open(url, "results.html");
    // },

    getLunch: function () {
      var x = $('#pick1').val();
      console.log("x " + x)


      if (x !== "Browse by Cuisine") {
        lunch.cuisine = "&term=" + lunch.cuisineOptions[x];
        console.log(lunch.cuisine)
      }

      var searchTerm = $("#searchInput").val();
      if (searchTerm) {
        lunch.cuisine = ('&term=' + searchTerm);
        console.log("ST" + searchTerm)
        console.log(lunch.cuisine);
      }

      var i = $('#pick2').val();
      console.log("price " + i);
      if (i !== "Price $") {
        lunch.price = ("&price=" + (lunch.priceOptions[i]))
        console.log(lunch.price);
      }
      // {

      var i = $("#pick4").val()
      if (i !== "Distance") {

        lunch.radius = ("&radius=" + (lunch.radiusOptions[i]))
        console.log(lunch.radius)
      }



      let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" + pos.lat + "&longitude=" + pos.lng + lunch.cuisine + lunch.price + lunch.radius + "&limit=10";
      console.log(queryURL)
      $.ajax({
        "url": queryURL,
        "method": "GET",
        "headers": {
          "Authorization": "Bearer S0WWk7FjtBiRBwAKcUlSEM21ieNrXSMfOW40A-d5nQmAXNVApE_9AsLrkfbSMt66JWI7c1_zlV43T75ZaWa8eQvbdM_NGlqQ_JDc3bTOuv6ML75_ip94vl2w1xmdXHYx",
        }
      }).then(function (response) {
        localStorage.setItem('response', JSON.stringify(response));
        var retrievedResponse = JSON.parse(localStorage.getItem('response'));
        console.log(response);
        console.log(retrievedResponse);
        var foodName = []
        console.log(typeof (retrievedResponse))
        for (var i = 0; i < 10; i++) {
          console.log(retrievedResponse.businesses[i].name)
          foodName.push(response.businesses[i]);
          console.log(foodName);
          console.log(i)
        }
        a = foodName[0].name;
        b = foodName[0].price;
        c = foodName[0].rating;
        d = foodName[0].review_count;
        e = foodName[0].location.display_address;
        f = foodName[0].display_phone;
        g = foodName[0].distance;
        h = foodName[0].image_url;

        var foodPics = $("<img class = 'foods'>");
        foodPics.attr("src", h);



        $("#foodType").html(a);
        $("#price").html(b);
        $("#rating").html(c);
        $("#reviews").html(d);
        $("#address").html(e);
        $("#number").html(f);
        $("#distance").html(g);
        $("#yelpImages").html(foodPics);
        $("#firstPage").hide();
        $("#secondPage").show();



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

  $("#locationDiv").on("click", function (event) {
    event.preventDefault();
    lunch.initMap();

  })


  if (pos !== "") {
    $("#submit").on("click", function (event) {
      event.preventDefault()
      var search = $("#searchInput").val();
      // lunch.openNewWindow();
      lunch.getLunch();
      console.log(a);


      //  $(window).on('load', function() {
      //         // page is fully loaded, including all frames, objects and images
      //         alert("window is loaded");



      //     }); 


      // window.location = "results.html";


    })
  }

}); //end ready wrapper
