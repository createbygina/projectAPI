var pos;
var a;
var b;
var c;
var d;
var e;
var f;
var g;
var h;
var y = 0;
var foodName = [];

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
    map: "",
    infoWindow: "",

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

    initMap1: function () {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 34.062255799999996,
          lng: -118.44514690000001
        },
        zoom: 20
      });
      infoWindow = new google.maps.InfoWindow;

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: foodName[y].coordinates.latitude,
            lng: foodName[y].coordinates.longitude
          };
          console.log(pos);

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    },

    handleLocationError: function (browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    },


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
        console.log(typeof (retrievedResponse))
        for (var i = 0; i < 10; i++) {
          console.log(retrievedResponse.businesses[i].name)
          foodName.push(response.businesses[i]);
          console.log(foodName);
          console.log(i)
        }

        var j, x, i;
        for (i = foodName.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = foodName[i];
          foodName[i] = foodName[j];
          foodName[j] = x
        }
        a = foodName[y].name;
        b = foodName[y].price;
        c = foodName[y].rating;
        d = foodName[y].review_count;
        e = foodName[y].location.display_address[0] + "</br>" + foodName[y].location.display_address[1];
        f = foodName[y].display_phone;
        g = foodName[y].distance;
        h = foodName[y].image_url;

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

    tyNext: function () {
      a = foodName[y].name;
      b = foodName[y].price;
      c = foodName[y].rating;
      d = foodName[y].review_count;
      e = foodName[y].location.display_address[0] + "</br>" + foodName[y].location.display_address[1];
      f = foodName[y].display_phone;
      g = foodName[y].distance;
      h = foodName[y].image_url;

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
    }
  } //end lunch obj
  console.log('startup');

  $("#locationDiv").on("click", function (event) {
    event.preventDefault();
    lunch.initMap();

  })

  if (pos !== "") {
    $("#submit").on("click", function (event) {
      event.preventDefault()
      var search = $("#searchInput").val();
      lunch.getLunch();
      lunch.initMap1();
      console.log(a);
    })
  }

  $("#nextPlace").on("click", function (event) {
    event.preventDefault();
    y++;
    if (y < foodName.length) {
      lunch.tyNext();
    } else {
      location.reload();
    }
  })

}); //end ready wrapper