function whatever(){
    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/quickAnswer?q=How+much+vitamin+c+is+in+2+apples%3F";

$.ajax({
    // header: {
    //     'X-RapidAPI-Key': '4e620d42c0mshd5bc66baae8748dp176b3djsn9f8470266a81'
    // },
    url: queryURL,
    method: "GET",
    beforeSend: function(xhr){
        xhr.setRequestHeader("")
    }
}).then(function (results) {
    console.log(results)

});

}
whatever();





// nutrition API
$('#get-started-button').on('click', function () {
    console.log('test');


});



// $("#search-button").on("click", function () {
//     var apiKey = "&api_key=dc6zaTOxFJmzC";

//     var userSearch = $("input").val();
//     $("#display").empty();

//     // userSearch = userSearch.split(" ");
//     console.log(userSearch);



//     queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userSearch + apiKey;

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response)

//         //  add 25 images based on search
//         for (var i = 0; i < 26; i++) {
//             var pic = response.data[i].images.fixed_width.url;
//             console.log(pic);
//             var $i = $("<img>");
//             var contentImage = $i.attr("src", pic);
//             $("#diplay").append(contentImage);
//         }

//     });



// });



