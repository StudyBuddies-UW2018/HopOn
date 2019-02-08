// var map, infoWindow, geocoder, lat, lng, pos;

// var browseInit = function () {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function (position) {
//             pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//             };
//             lat = pos.lat;
//             lng = pos.lng;
//             console.log("bi " + lat + lng);
//             brewFunction();

//         }, function () {
//             $('#brewGallery').append(`<h2>You have elected not to HopOn</h2>`);
//         });
//     } else {
//         // Browser doesn't support Geolocation
//         handleLocationError(false, map.getCenter());
//     }
// };
// browseInit();

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(browserHasGeolocation ?
//         'Error: The Geolocation service failed.' :
//         'Error: Your browser doesn\'t support geolocation.');
//     infoWindow.open(map);
// }

// // ==============================================================================================================
// var cors = 'https://cors-anywhere.herokuapp.com/';

// var brewFunction = function () {

//     // find breweries within a 10mi raidus of your current location
//     var queryURL2 = cors + 'https://www.brewerydb.com/browse/map/get-breweries?lat=' + lat + '&lng=' + lng;

//     $.ajax({
//         url: queryURL2,
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         method: "GET",
//     }).then(function (results) {

//         console.log(results);

//         var arrayLength = results.totalResults;

//         // loop through array
//         for (var i = 0; i < arrayLength; i++) {
//             var breweryName = results.data[i].brewery.name;
//             // var openToPublic = results.data[i].openToPublic;
//             var breweryDescription = results.data[i].brewery.description;

//             if (!breweryDescription) {
//                 breweryDescription = "some description";
//             }

//             var breweryImage = results.data[i].brewery.images;

//             if (typeof breweryImage === 'undefined') {
//                 breweryImage = "assets/images/hop.png";
//                 var breweryLogo = "assets/images/hop.png";

//             } else {
//                 breweryImage = results.data[i].brewery.images.icon;
//                 var breweryLogo = results.data[i].brewery.images.squareMedium;
//             }

//             $('#brewGallery').append(
//                 `<a href="#" class="ui card" data-name="${breweryName}" data-logo="${breweryLogo}">
//                 <div class="extra content">
//                     <span class="left floated like">
//                         <i class="like icon"></i>
//                         Like
//                     </span>
//                     <span class="right floated star">
//                         <i class="star icon"></i>
//                         Favorite
//                     </span>
//                 </div>
//                 <div class="content center aligned">
//                     <p>${breweryName}</p>
//                     <img src="${breweryImage}" width='64' height='64' />
//                 </div>
//             </a>`

//             );
//             // mark brewery locations on map
//             var breweryLocations = function () {
//                 var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
//                 var marker = new google.maps.Marker({
//                     position: {
//                         lat: results.data[i].latitude,
//                         lng: results.data[i].longitude,
//                     },
//                     map: map,
//                     icon: image
//                 });
//             }
//             breweryLocations();
//         };

//         $('body').on('click', 'a.ui.card', function (event) {
//             event.preventDefault();
//             console.log('click');
//         });
//     });
// };
// // =================================== MODAL ===========================================//

// $('body').on('click', 'a.ui.card', function (event) {
//     event.preventDefault();
//     console.log('click');


//     // Get the modal
//     var modal = document.getElementById('myModal');

//     // Get the <span> element that closes the modal
//     var span = document.getElementsByClassName("close")[0];

//     // When the user clicks the button, open the modal
//     modal.style.display = "block";

//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function () {
//         $('.modal').css('display', 'none');
//     }

//     //FIXME: Tad will fix this. 
//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function (event) {
//         if (event.target == modal) {
//             // modal.style.display = "none";
//             $('.modal').css('display', 'none');
//         }
//     }

//     // CREATE VARIABLES FOR INDIVIDUAL MODAL CONTENT

//     // var brewName = this.data-name;
//     var brewName = this.getAttribute("data-name");
//     console.log("brewName=" + brewName);

//     var brewLogo = this.getAttribute("data-logo");


//     var modal =
//         `<div class="ui middle aligned center aligned grid home-page">
//         <div class="column">
//             <div class="ui text container">
//                 <h1 class="ui">
//                     ${brewName}
//                 </h1>
//                 <img src="${brewLogo}" alt="brewery logo">
//                 <p>insert brewery description if description exists</p>

//                 <!-- Button to go to brewery website -->
//                 <div class="ui huge primary button home-button" id="brewery-site-button">Visit website</div>
//                 <br>
//                 <p>Drink responsibly. Get a ride! <i class="fas fa-car-side"></i></p>
//                 <!-- Lyft button -->
//                 <div class="ui huge primary button home-button" id="lyft-button">Lyft Button</div>
//             </div>
//         </div>
//     </div>`
//     $('.modal-info').html(modal);

// });