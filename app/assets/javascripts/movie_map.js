$(function () {
  var defaultLatLng = new google.maps.LatLng(37.7750, -122.4183);
  google.maps.visualRefresh = true;

    var customStyle = [{"featureType":"water","stylers":[{"color":"#021019"}]},{"featureType":"landscape","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"transit","stylers":[{"color":"#146474"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]}]

    var map = window.map = new google.maps.Map(document.querySelector("#map-canvas"), {
        center: defaultLatLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: customStyle,
    });

  var markers = {};

  var infowindow= new google.maps.InfoWindow({maxWidth:300});

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
            title: location.address
          });
          addClickListener(marker,location);
        }
      }
    });
  });

  function addClickListener(marker,currentLocation) {
    google.maps.event.addListener(marker, 'click', function() {
      var infoWindowhtml = currentLocation.address + '<br />';

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
