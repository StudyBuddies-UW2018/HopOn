// ================================= Code for Brewery Detail Page =========================================//

var brewName = localStorage.getItem("brewName");
console.log(brewName);
var brewLat = localStorage.getItem("brewLat");
console.log(brewLat);
var brewLong = localStorage.getItem("brewLong");
console.log(brewLong);
var brewLogo = localStorage.getItem("brewLogo");
console.log(brewLogo);
var brewDesc = localStorage.getItem("brewDesc");
var brewType = localStorage.getItem("brewType");
var brewLocal = localStorage.getItem("brewLocal");
console.log(brewLocal);
var breweryPhone = localStorage.getItem("breweryPhone");



var brewURL = localStorage.getItem("brewURL");



$('.brewName').text(brewName);
$('.brewLogo').attr("src", brewLogo);
$('.brewDesc').text(brewDesc);
$('.brewType').append(brewType);
$('.brewLocal').append(brewLocal);
$('.breweryPhone').append(breweryPhone);
$('.brewURLButton').attr("href", brewURL);

  
  



// ================================= END Code for Brewery Detail Page =====================================//

//==============================================Lyft API ==============================================//

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
            latitude: brewLat,
            longitude: brewLong,
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
//==============================================END Lyft API ==============================================//