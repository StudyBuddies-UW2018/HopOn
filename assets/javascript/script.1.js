//kelsey's test
// navigate to browse breweries page
$('#browse-button').on('click', function () {
    window.location.replace('browse.html')

});

// navigate to search by location
$('#by-location-button').on('click', function () {
    console.log('click');
    window.location.replace('location.html')

});


// ==============================================================================================================

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow, geocoder, lat, lng, pos;
//TODO: Add global variable for getter and setter for the position


var geoLocation = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            lat = pos.lat;
            lng = pos.lng;

            console.log("pos: " + lat + " " + lng);
            // TODO: getter for pos??
            var geoAPIKey = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyAo6UHq_FVsEuafC_nHi57NG1e6X1wEOcY";
            console.log("geoAPIKey: " + geoAPIKey);
            beer(pos.lat, pos.lng);
            // console.log(geoAPIKey);
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            infoWindow.open(map);
            map.setCenter(pos);

            // TODO: Get brewery info
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
  

};
var googleMapsAPIkey = "AIzaSyAo6UHq_FVsEuafC_nHi57NG1e6X1wEOcY";
// my apartment lat/lang endpoint


function initMap() {
    // geocoder = new google.maps.Geocoder();
    //TODO: Change lat./long. to USA
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 47.637612499999996,
            lng: -122.32353949999998
        },
        //How far zoomed in the map is
        zoom: 13
    });
    //Unsure of what does this does
    infoWindow = new google.maps.InfoWindow;
    geoLocation();
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
// ==============================================================================================================



function beer() {
    var beerAPIKey = "f913c5671c3fcabead2777ee5dbe6892";
    var cors = 'https://cors-anywhere.herokuapp.com/';
    var searchEndpoint = 'search/geo/point?lat=' + lat + '&lng=' + lng + '&radius=100';
    console.log("search endpoint " + searchEndpoint);
    var queryURL = cors + 'https://sandbox-api.brewerydb.com/v2/' + searchEndpoint + '&key=' + beerAPIKey; // endpoint that returns all breweries and locations

    // end result URL --> functioning
    // https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/search/geo/point?lat=47.637612499999996&lng=-122.32353949999998&radius=100&key=f913c5671c3fcabead2777ee5dbe6892

    console.log(queryURL);
    console.log("TEST2" + lat + lng);


    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (results) {
        console.log("TEST" + lat + lng);

    });
};

// beer();
// ==============================================================================================================