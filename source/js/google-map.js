if (document.querySelector("#map")) {
  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 34.860, lng: -111.789},
      scrollwheel: false
    });

    var image = 'img/map-marker.svg';
    var beachMarker = new google.maps.Marker({
      position: {lat:34.860, lng:-111.789},
      map: map,
      icon: image
    });
  }
}
