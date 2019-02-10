// navigate to browse breweries page
$('#browse-button').on('click', function () {
    window.location.replace('browse.html')

});

// ==============================================================================================================

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow, geocoder, lat, lng, pos, currentLat, currentLng;
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
            currentLat = pos.lat;
            currentLng = pos.lng;

            var geoAPIKey = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyAo6UHq_FVsEuafC_nHi57NG1e6X1wEOcY";
            console.log("geoAPIKey: " + geoAPIKey);
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            // zoom in on current location
            map.zoom = 13;
            infoWindow.open(map);
            map.setCenter(pos);
            brewFunction();

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

// ============================= AJAX CALL AND CREATING BREWERY CARDS ====================================//
var cors = 'https://cors-anywhere.herokuapp.com/';
var brewFunction = function () {
    // this endpoint is hitting the Brewery DB webesite directly instead of the sandbox
    // it is using the current location lat/lng to locate breweries within a 10 mi radius
    // 10 mi is the default radius per the documentation
    console.log('current lat and lng ' + currentLat + currentLng);
    var queryURL2 = cors + 'https://www.brewerydb.com/browse/map/get-breweries?lat=' + currentLat + '&lng=' + currentLng;
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
            
            // create brewery description variable
            var breweryDescription = results.data[i].brewery.description;
            if (!breweryDescription) {
                breweryDescription = " ";
            }
            // console.log(breweryDescription);

            // create brewery url variable
            var breweryURL = results.data[i].brewery.website;
            if (!breweryURL) {
                breweryURL = "NO-URL";
            }
            // console.log(breweryURL);

            var breweryImage = results.data[i].brewery.images;
            
            //Set brewery logos in variables to use on browse and modals
            if (typeof breweryImage === 'undefined') {
                breweryImage = "assets/images/hop-icon.png";
                var breweryLogo = "assets/images/hop.png";

            } else {
                breweryImage = results.data[i].brewery.images.icon;
                var breweryLogo = results.data[i].brewery.images.squareMedium;
            }

            var breweryLat = results.data[i].latitude;
            var breweryLong = results.data[i].longitude;

            var breweryHours = results.data[i].hoursOfOperation;
            if (!breweryHours) {
                breweryHours = " ";
            }
            // console.log(breweryHours);


            var card = `<div class="ui card" data-name="${breweryName}" data-logo="${breweryLogo}" data-desc="${breweryDescription}" data-url="${breweryURL}" data-lat="${breweryLat}" data-long="${breweryLong}">
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
                <a href="brewery.html">
                    <h3>${breweryName}</h3>
                    <img src="${breweryImage}" width='64' height='64' />
                    <p>${breweryName}</p>
                </a>
            </div>
        </div>`;

            $('#brewGallery').append(card);


            var breweryLocations = function () {
                var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
                var beachMarker = new google.maps.Marker({
                    position: {
                        lat: results.data[i].latitude,
                        lng: results.data[i].longitude
                    },
                    map: map,
                    icon: image,
                    name: results.data[i].brewery.name,
                    logo: breweryImage

                });
                beachMarker.addListener('click', function() {
                    console.log('YOU CLICKED A BEACH MARKER');
                    infoWindow.setPosition(this.position);
                    infoWindow.setContent("<div style='float:unset'><img class='map-logo' src='" + this.logo + "'></div>" + this.name);
                    infoWindow.open(map);

                });

            }
            breweryLocations();
        };





        $('body').on('click', 'a.ui.card', function (event) {
            event.preventDefault();
            console.log('click');
        });

        

    });
};

// ==========================END AJAX CALL AND CREATING BREWERY CARDS ================================//

// =================================== ON CLICK FOR MAP ===============================================//

//                  DELETE ALL THIS

// $('body').on('click', beachMarker, function (event) {
//     event.preventDefault();
//     console.log('YOU CLICKED A BEACH MARKER');
//     infoWindow.setPosition(this.position);
//     // infoWindow.setContent(this.name);
//     infoWindow.setContent("HEY");
//     infoWindow.open(map);
// });

// =================================== END ON CLICK FOR MAP ============================================//


// ============================================ MODAL ==================================================//

$('body').on('click', 'div.ui.card', function (event) {
    event.preventDefault();


    // CREATE VARIABLES FOR INDIVIDUAL BREWERY CONTENT

    // var brewName = this.data-name;
    var brewName = this.getAttribute("data-name");
    console.log("brewName=" + brewName);

    var brewLogo = this.getAttribute("data-logo");
    var brewDesc = this.getAttribute("data-desc");
    var brewURL = this.getAttribute("data-url");
    var brewLat = this.getAttribute("data-lat");
    var brewLong = this.getAttribute("data-long");

    if (typeof(Storage) !== "undefined") {
        console.log("Code for localStorage/sessionStorage.");
        localStorage.setItem("brewName", brewName);
        localStorage.setItem("brewLat", brewLat);
        localStorage.setItem("brewLong", brewLong);
        localStorage.setItem("brewLogo", brewLogo);
        localStorage.setItem("brewDesc", brewDesc);
        localStorage.setItem("brewURL", brewURL);

    } else {
        console.log("Sorry! No Web Storage support..");
    }

    var modal =
        `<div class="ui middle aligned center aligned grid home-page">
        <div class="column">
            <div class="ui text container">
                <h1 class="ui">
                    ${brewName}
                </h1>
                <img src="${brewLogo}" alt="brewery logo">
                <p>${brewDesc}</p>                
            </div>
        </div>
    </div>`;
    $('.brewDetails').html(modal);

    if (brewURL !== "NO-URL") {
        $('.brewDetails').append(`
            <a href="${brewURL}" target="_blank" class="brewURLButton">
               <div class="ui huge primary button home-button" id="brewery-site-button">Visit website</div>
            </a>
        `);
    }

    $('.brewDetails').append(`
        <br>
        <p id="lyft-desc">Drink responsibly. Get a ride! <i class="fas fa-car-side"></i></p>
        <!-- Lyft button -->
        <div id="lyft-web-button-parent"></div>
        `);

    document.location.href = 'brewery.html';

});

// ============================================ END MODAL ==============================================//

// ================================== FIREBASE REGISTER PAGE ===========================================//

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAX5YgDAquBM8CxrEckXe0MN3XWhWKjeHU",
    authDomain: "hopon-f4180.firebaseapp.com",
    databaseURL: "https://hopon-f4180.firebaseio.com",
    projectId: "hopon-f4180",
    storageBucket: "hopon-f4180.appspot.com",
    messagingSenderId: "176317052818"
};
    
firebase.initializeApp(config);

//define the database variable and empty strings for new user information
var database = firebase.database();
        
var firstName = "";
var lastName = "";
var userName = "";
var password = "";


//event handler for submit button
$(".submit").on("click", function(event){
    event.preventDefault();

    firstName = $("#firstName").val().trim();
    console.log(firstName)

    lastName = $("#lastName").val().trim();
    console.log(lastName)

    userName = $("#userName").val().trim();
    console.log(userName)

    password = $("#password").val().trim();
    console.log(password)

    database.ref("/users").once("value", function(snapshot){
        var snapShot = snapshot.val()

        for (var key in snapShot) {
            console.log(snapShot[key].username)
            // snapShot[key].password === password
            //create if/ else/ else if statements to match usernames to passwords
        };
    });
});

//event listner for Username and Password information     
$(".submit").on("click", function(event){
    event.preventDefault();

    //Clears extra space after entering user information

    firstName = $("#firstName").val().trim();
    console.log(firstName)

    lastName = $("#lastName").val().trim();
    console.log(lastName)

    userName = $("#userName").val().trim();
    console.log(userName)

    password = $("#password").val().trim();
    console.log(password)

    //Pushes into a user folder in firebase
    database.ref("/users").push({
        first: firstName,
        last: lastName,
        username: userName, 
        password: password
     });
    
    //Clears form after adding information to form
    $("#firstName").val("");
    $("#lastName").val("");
    $("#userName").val("");
    $("#password").val("");
});
        

database.ref().on("value", function(snapshot) {

    // Print the initial data to the console
    console.log(snapshot.val());

    // Log the value of the various properties
    console.log(snapshot.val().firstName);
    console.log(snapshot.val().lastName);
    console.log(snapshot.val().userName);
    console.log(snapshot.val().password);

    // If any errors are experienced, log them to console.
    }, function(errorObject) {

        console.log("The read failed: " + errorObject.code);
 });

//function to append new information to user
database.ref().on("child_added", function(childSnapShot) {
    console.log(childSnapShot.val());
    

    var newUser = childSnapShot.val().username;
    var newPassword = childSnapShot.val().password;
});

// ======================================= END FIREBASE REGISTER PAGE =============================================//