(function () {
    // Cors hookup added to make Cors friendly
    var cors = 'https://cors-anywhere.herokuapp.com/';
    var locationEndpoint = 'locations?';
    var beerAPIkey = 'f913c5671c3fcabead2777ee5dbe6892'; //TODO: Make this private
    var queryURL = cors + 'https://sandbox-api.brewerydb.com/v2/' + locationEndpoint + 'key=' + beerAPIkey; // endpoint that returns all breweries and locations

    // TODO: find a way to use latitude and longitude of current location to find brewries at near by lat/long


    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (results) {

        // Listing 30 Breweries TODO: Create it for local to area
        for (var i = 0; i < 30; i++) {
            var breweryName = results.data[i].name;
            var breweryImage = results.data[i].brewery.images.icon;
            var openToPublic = results.data[i].openToPublic;
            //TODO: Add additional value returns perhaps description and open right now?
            if (openToPublic === "Y") {
                //console.log(results);

                $('#brewGallery').append(`<a href="#" iv class="ui card">
                <div class="extra content">
                    <span class="left floated like">
                        <i class="like icon"></i>
                        Like
                    </span>
                    <span class="right floated star">
                        <i class="star icon"></i>
                        Favorite
                    </span>
                </div>
                <div class="content">
                    <p>${breweryName}</p>
                    <img src="${breweryImage}" />
                    <p>${openToPublic}</p>
                    <i class="beer icon ui centered right floated"></i>
                </div>
            </a>`);
            }
        }
    });
})();
// ==============================================================================================================

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

            // console.log("pos: " + lat + " " + lng);
            var geoAPIKey = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyAo6UHq_FVsEuafC_nHi57NG1e6X1wEOcY";
            console.log("geoAPIKey: " + geoAPIKey);
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            infoWindow.open(map);
            map.setCenter(pos);
            beer();

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


// this function is calling all breweries within a 100 mi radius of current location
function beer() {
    var beerAPIKey = "f913c5671c3fcabead2777ee5dbe6892";
    var cors = 'https://cors-anywhere.herokuapp.com/';
    // here current location is being set and radius is being set
    var searchEndpoint = 'search/geo/point?lat=' + lat + '&lng=' + lng + '&radius=100';
    console.log("search endpoint " + searchEndpoint);
    var queryURL = cors + 'https://sandbox-api.brewerydb.com/v2/' + searchEndpoint + '&key=' + beerAPIKey; // endpoint that returns all breweries and locations

    // end result URL --> functioning
    // https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/search/geo/point?lat=47.637612499999996&lng=-122.32353949999998&radius=100&key=f913c5671c3fcabead2777ee5dbe6892

    console.log(queryURL);
    console.log("Current location: " + lat + lng);


    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (results) {
        console.log(results);

    });
};

// ==============================================================================================================