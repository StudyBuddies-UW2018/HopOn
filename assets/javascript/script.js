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

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 38.0000,
            lng: -97.0000
        },
        //How far zoomed in the map is
        zoom: 4
    });
    infoWindow = new google.maps.InfoWindow;
    geoLocation();
};


var geoLocation = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            var geoAPIKey = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyAo6UHq_FVsEuafC_nHi57NG1e6X1wEOcY";
            console.log("geoAPIKey: " + geoAPIKey);
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            // zoom in on current location
            map.zoom = 13;
            infoWindow.open(map);
            map.setCenter(pos);

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
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

            if (typeof breweryImage === 'undefined') {
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

/**
 * Immediately-invoked function expression that configures and instantiates a lyftWebButton.
 * @param {Object} options object for configuring the button (see README.md)
 */
var OPTIONS = {
    scriptSrc: 'assets/javascript/lyftWebButton.min.js',
    namespace: '',
    clientId: 'XDnhhOqwyLGF',
    clientToken: 'JJUujaMGiPYZELSa054PRbvsLKZWtgGAS7KV5cQtiBf',
    location: {
        pickup: {},
        destination: {
            latitude: '47.612720',
            longitude: '-122.320270',
        },
    },
    parentElement: document.getElementById('lyft-web-button-parent'),
    queryParams: {
        credits: ''
    },
    theme: 'mulberry-dark large',
};
(function (t) {
    var n = this.window,
        e = this.document;
    n.lyftInstanceIndex = n.lyftInstanceIndex || 0;
    var a = t.parentElement,
        c = e.createElement("script");
    c.async = !0, c.onload = function () {
        n.lyftInstanceIndex++;
        var e = t.namespace ? "lyftWebButton" + t.namespace + n.lyftInstanceIndex : "lyftWebButton" + n.lyftInstanceIndex;
        n[e] = n.lyftWebButton, t.objectName = e, n[e].initialize(t)
    }, c.src = t.scriptSrc, a.insertBefore(c, a.childNodes[0])
}).call(this, OPTIONS);
