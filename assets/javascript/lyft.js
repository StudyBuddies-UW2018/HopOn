// https://developer.lyft.com/v1/reference#ride-request

// https://developer.lyft.com/docs/overview

//the github repo that's needed????
// https://github.com/lyft/lyft-node-sdk

// Client id: XDnhhOqwyLGF
// Client token: JJUujaMGiPYZELSa054PRbvsLKZWtgGAS7KV5cQtiBf/pGVy32bshjmDEooPOQ8QkvwBjbXqsr6/YuB31ChlG6eqGQdzv5obVqf0kTUdZ8caR52Ut4jgH6U=
// Client secret: 92CSNUrJ68OZL_Wmpb75mvFH1AMh6aj_


// EXAMPLE Codes

//Ride Request-------------------------------------

import lyft from 'node-lyft';
let defaultClient = lyft.ApiClient.instance;

// Configure OAuth2 access token for authorization: User Authentication
let userAuth = defaultClient.authentications['User Authentication'];
userAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new lyft.UserApi();

let request = new lyft.Ride('lyft', new lyft.Location(37.77663, -122.39227));
request.destination = new lyft.Location(37.771, -122.39123);

apiInstance.newRide(request).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});
//-----------------------------------------------------------

//Ride Details---------------------------------------------------

import lyft from 'node-lyft';
let defaultClient = lyft.ApiClient.instance;

// Configure OAuth2 access token for authorization: User Authentication
let userAuth = defaultClient.authentications['User Authentication'];
userAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new lyft.UserApi();

let id = "123"; // The ID of the ride

apiInstance.getRide(id).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});
//-----------------------------------------------------------

//Ride Destination---------------------------------------------------

import lyft from 'node-lyft';
let defaultClient = lyft.ApiClient.instance;

// Configure OAuth2 access token for authorization: User Authentication
let userAuth = defaultClient.authentications['User Authentication'];
userAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new lyft.UserApi();

let id = "<ride_id>"; // The ID of the ride

let request = new lyft.Location(34.305658, -118.8893667);

apiInstance.setRideDestination(id, request).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
//-----------------------------------------------------------

//Ride Rating and Tipping---------------------------------------------------

import lyft from 'node-lyft';
let defaultClient = lyft.ApiClient.instance;

// Configure OAuth2 access token for authorization: User Authentication
let userAuth = defaultClient.authentications['User Authentication'];
userAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new lyft.UserApi();

let id = "<ride_id>"; // The ID of the ride

let request = new lyft.RatingRequest("5");
request.feedback = "Great ride!";
request.tip = new lyft.Tip();
request.tip.amount = 100;
request.tip.currency = "USD";

apiInstance.setRideRating(id, request).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});
//-----------------------------------------------------------

//Ride Receipt---------------------------------------------------

import lyft from 'node-lyft';
let defaultClient = lyft.ApiClient.instance;

// Configure OAuth2 access token for authorization: User Authentication
let userAuth = defaultClient.authentications['User Authentication'];
userAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new lyft.UserApi();

let id = "<ride_id>"; // String | The ID of the ride

apiInstance.getRideReceipt(id).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});
//-----------------------------------------------------------

//Ride Cancel---------------------------------------------------

import lyft from 'node-lyft';
let defaultClient = lyft.ApiClient.instance;

// Configure OAuth2 access token for authorization: User Authentication
let userAuth = defaultClient.authentications['User Authentication'];
userAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new lyft.UserApi();

let id = "<ride_id>"; // String | The ID of the ride

apiInstance.cancelRide(id).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});
//-----------------------------------------------------------

//Availability Ride Types---------------------------------------------------

import lyft from 'node-lyft';
let defaultClient = lyft.ApiClient.instance;

// Configure OAuth2 access token for authorization: Client Authentication
let clientAuth = defaultClient.authentications['Client Authentication'];
clientAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new lyft.PublicApi();

apiInstance.getRideTypes(37.7763, -122.3918).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});
//-----------------------------------------------------------

//Availability Driver ETA---------------------------------------------------

import lyft from 'node-lyft';
let defaultClient = lyft.ApiClient.instance;

// Configure OAuth2 access token for authorization: Client Authentication
let clientAuth = defaultClient.authentications['Client Authentication'];
clientAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new lyft.PublicApi();

apiInstance.getETA(37.7763, -122.3918).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});
//-----------------------------------------------------------

//Availability Ride Estimates---------------------------------------------------

import lyft from 'node-lyft';
let defaultClient = lyft.ApiClient.instance;

// Configure OAuth2 access token for authorization: Client Authentication
let clientAuth = defaultClient.authentications['Client Authentication'];
clientAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new lyft.PublicApi();

let opts = { 
  'endLat': 37.7972, // Latitude of the ending location
  'endLng': -122.4533 // Longitude of the ending location
};

apiInstance.getCost(37.7763, -122.3918, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});
//-----------------------------------------------------------

//Availability Nearby Drivers---------------------------------------------------

import lyft from 'node-lyft';
let defaultClient = lyft.ApiClient.instance;

// Configure OAuth2 access token for authorization: Client Authentication
let clientAuth = defaultClient.authentications['Client Authentication'];
clientAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new lyft.PublicApi();

apiInstance.getDrivers(37.7763, -122.3918).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});
//-----------------------------------------------------------

//Availability ETA and Nearby Drivers---------------------------------------------------

//Shell
//-----------------------------------------------------------

//Users Ride History---------------------------------------------------

import lyft from 'node-lyft';
let defaultClient = lyft.ApiClient.instance;

// Configure OAuth2 access token for authorization: User Authentication
let userAuth = defaultClient.authentications['User Authentication'];
userAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new lyft.UserApi();

let startTime = new Date("2017-01-20T19:20:30+01:00");

apiInstance.getRides(startTime).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});
//-----------------------------------------------------------

//Users Profile---------------------------------------------------

import lyft from 'node-lyft';
let defaultClient = lyft.ApiClient.instance;

// Configure OAuth2 access token for authorization: User Authentication
let userAuth = defaultClient.authentications['User Authentication'];
userAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new lyft.UserApi();
apiInstance.getProfile().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});
//-----------------------------------------------------------