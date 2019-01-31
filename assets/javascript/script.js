// nutrition API
$('#get-started-button').on('click', function () {
    console.log('test');
    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/quickAnswer?q=How+much+vitamin+c+is+in+2+apples%3F";

    $.ajax({
        url: queryURL,
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-RapidAPI-Key', '4e620d42c0mshd5bc66baae8748dp176b3djsn9f8470266a81');
        }
    }).then(function (results) {
        console.log(results)

    });

});
