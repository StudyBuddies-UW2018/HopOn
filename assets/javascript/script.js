
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
            // beer();

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
var cors = 'https://cors-anywhere.herokuapp.com/';

(function () {
    // geoLocation();

    // this endpoint is hitting the Brewery DB webesite directly instead of the sandbox
    // it is using the current location lat/lng to locate breweries within a 10 mi radius
    // 10 mi is the default radius per the documentation
    var queryURL2 = cors + 'https://www.brewerydb.com/browse/map/get-breweries?lat=' + '47.637612499999996' + '&lng=' + '-122.32353949999998';
    console.log(queryURL2);
    // console.log("Current lat + lng: " + lat + lng);


    $.ajax({
        url: queryURL2,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "GET",
    }).then(function (results) {

        console.log(results);

        var arrayLength = results.totalResults;
        console.log("array length: " + arrayLength);


        // loop through array
        for (var i = 0; i < arrayLength; i++) {
            var breweryName = results.data[i].brewery.name;
            // var openToPublic = results.data[i].openToPublic;
            var breweryDescription = results.data[i].brewery.description;

            if (!breweryDescription) {
                breweryDescription = "some description";
            }

            var breweryImage = results.data[i].brewery.images;

            if (typeof breweryImage === 'undefined'){
                breweryImage = "assets/images/hop.png";

            } else {
                breweryImage = results.data[i].brewery.images.icon;
            }

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
            <div class="content center aligned">
                <p>${breweryName}</p>
                <img src="${breweryImage}" width='64' height='64' />
            </div>
        </a>`);
        }
    });

})();

//===================================================
//Lyft API

function lyft () {
    // curl -X POST -H "Content-Type: application/json" \
    //  --user "XDnhhOqwyLGF:92CSNUrJ68OZL_Wmpb75mvFH1AMh6aj_" \
    //  -d '{"grant_type": "client_credentials", "scope": "public"}' \
    //  'https://api.lyft.com/oauth/token'

    $.ajax({
        url: cors + 'https://api.lyft.com/oauth/token',
        method: 'GET',
        dataType: 'json',
        headers: {
            "Authorization": "Basic " + btoa('XDnhhOqwyLGF' + ":" + '92CSNUrJ68OZL_Wmpb75mvFH1AMh6aj_')
        }
    }).then(function (response) {
        console.log(response);
    });

//TODO: Create new auth. token prior to the demo show
//FIXME: Create cleaner code

    $.ajax({
        url: cors + 'https://api.lyft.com/v1/eta?lat=37.7833&lng=-122.4167',
        method: 'GET',
        dataType: 'json',
        headers: {
            "Authorization": "Bearer JJUujaMGiPYZELSa054PRbvsLKZWtgGAS7KV5cQtiBf/pGVy32bshjmDEooPOQ8QkvwBjbXqsr6/YuB31ChlG6eqGQdzv5obVqf0kTUdZ8caR52Ut4jgH6U="
        }
    }).then(function (response) {
        console.log(response);
    });

// curl --include -X GET -H 'Authorization: Bearer LTlpTugbNVO5TTPXmElE5lokGkzgqLBOd7Bm3xAnEpH7pT3OSYkj9sNCLlxLQZpsMYvLeyMJM5DUYGTnRVOWJhoJ+CO51TqGGDNFUmps0KUolqYYYMWiVdc=' \
// 'https://api.lyft.com/v1/eta?lat=37.7833&lng=-122.4167'

};

lyft();