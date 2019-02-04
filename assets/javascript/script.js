var cors = 'https://cors-anywhere.herokuapp.com/';


(function () {
    // Cors hookup added to make Cors friendly
    var locationEndpoint = 'locations?';
    var beerAPIkey = 'f913c5671c3fcabead2777ee5dbe6892'; //TODO: Make this private
    var queryURL = cors + 'https://sandbox-api.brewerydb.com/v2/' + locationEndpoint + 'key=' + beerAPIkey; // endpoint that returns all breweries and locations
    console.log("beer1" + queryURL);
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
function beer() {
    // this endpoint is hitting the Brewery DB webesite directly instead of the sandbox
    // it is using the current location lat/lng to locate breweries within a 10 mi radius
    // 10 mi is the default radius per the documentation
    var queryURL2 = cors + 'https://www.brewerydb.com/browse/map/get-breweries?lat=' + lat + '&lng=' + lng;
    console.log(queryURL2);
    console.log("Current lat + lng: " + lat + lng);


    $.ajax({
        url: queryURL2,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "GET",
    }).then(function (results) {
        console.log(results);


        var arrayLength = results.totalResults;
        console.log("array length: " + arrayLength);


        for (var i = 0; i < arrayLength; i++) {
            // brewery name
            var breweryName = results.data[i].brewery.name;
            var breweryDescription = results.data[25].brewery.desciprtion;
            // is the brewery open to the public? Yes they all are
            var openToPublic = results.data[i].openToPublic;
            // var brandClassification = results.data[i].brewery.brandClassification;

            // is it a certified craft brewer? - Not a field for all entries
            // var isCertifiedCraftBrewer = results.data[i].brewery.brewersAssociation.isCertifiedCraftBrewer;
            // TODO:find out what to do when not a field for all entries

            if (openToPublic === "Y") {
                console.log("name: " + i + " " + breweryName);
                console.log("description: " + breweryDescription)
                console.log("Open: " + openToPublic);
                // console.log("brand: " + brandClassification);

                // console.log("certified? " + isCertifiedCraftBrewer);
            }
        }

        // pos1 = {
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude
        // };
        // pos2 = {
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude
        // };
        // pos3 = {
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude
        // };

        // infoWindow.setPosition(pos1);
        // infoWindow.setPosition(pos2);
        // infoWindow.setPosition(pos3);

    });
};


// ==============================================================================================================