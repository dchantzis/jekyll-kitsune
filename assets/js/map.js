function initMap() {

  var mapZoom = $('#map').data('zoom');
  var mapLat = $('#map').data('latitude');
  var mapLng = $('#map').data('longitude');
  var styles = [{
    "featureType": "landscape",
    "stylers": [
        {
            "saturation": -100
        },
        {
            "lightness": 65
        },
        {
            "visibility": "on"
        }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
        {
            "saturation": -100
        },
        {
            "lightness": 51
        },
        {
            "visibility": "simplified"
        }
    ]
  },
  {
    "featureType": "road.highway",
    "stylers": [
        {
            "saturation": -100
        },
        {
            "visibility": "simplified"
        }
    ]
  },
  {
    "featureType": "road.arterial",
    "stylers": [
        {
            "saturation": -100
        },
        {
            "lightness": 30
        },
        {
            "visibility": "on"
        }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
        {
            "saturation": -100
        },
        {
            "lightness": 40
        },
        {
            "visibility": "on"
        }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
        {
            "saturation": -100
        },
        {
            "visibility": "simplified"
        }
    ]
  },
  {
    "featureType": "administrative.province",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
        {
            "visibility": "on"
        },
        {
            "lightness": -25
        },
        {
            "saturation": -100
        }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
        {
            "hue": "#ffff00"
        },
        {
            "lightness": -25
        },
        {
            "saturation": -97
        }
    ]
  }
];

  var mapDiv = document.getElementById("map");
  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
  var mapOptions = {
    zoom: mapZoom,
    center: new google.maps.LatLng(mapLat, mapLng),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  var map = new google.maps.Map(mapDiv, mapOptions);

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

}
