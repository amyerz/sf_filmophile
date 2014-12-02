

$(function () {
  var defaultLatLng = new google.maps.LatLng(37.773659, -122.447863);

    var customStyle =
        [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":40}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-10},{"lightness":30}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60},{"lightness":60}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]}]
    google.maps.visualRefresh = true;

    var map = window.map = new google.maps.Map(document.querySelector("#map-canvas"), {
        center: defaultLatLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: customStyle
  });

  var markers = {};

  var infowindow= new google.maps.InfoWindow({maxWidth:"none"});

  google.maps.event.addListener(map, "bounds_changed", function () {
    var bounds, marker;

    bounds = map.getBounds();

    if (!bounds) {
      return;
    }

    locationData.forEach(function (location, index) {
      if (!markers[location.id]) {
        if (!location._latlng) {
          location._latlng = new google.maps.LatLng(
            location.latitude,
            location.longitude
          );
        }

        if (bounds.contains(location._latlng)) {
          marker = markers[location.id] = new google.maps.Marker({
            position: location._latlng,
            map: map,
            title: location.address,
                animation: google.maps.Animation.DROP
          });
          addClickListener(marker,location);
        }
      }
    });
  });

  function addClickListener(marker,currentLocation) {
    google.maps.event.addListener(marker, 'click', function() {
      var infoWindowhtml = '<a href="/movies/' + currentLocation.movie_id + '">' + movieData[currentLocation.movie_id].movie_title + '</a><br />';

      if (currentLocation.fun_fact) {
        infoWindowhtml += 'Fun Fact:' + currentLocation.fun_fact;
      }
      infowindow.setContent(infoWindowhtml);
      infowindow.open(map,marker);
    });

  }




  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    var geocoder = new google.maps.Geocoder;

    geocoder.geocode({ address:
      document.querySelector("input").value
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
      } else {
        console.error("Google geocoding failed, fool!");
      }
    });
  }, false);
});
