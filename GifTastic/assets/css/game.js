var topics = ["Martin Scorsese", "Stanley Kubrick", "Jaws", "Steven Speilberg", "Goodfellas", "George Lucas", "Sam Peckinpah", "Paul Thomas Anderson", "Clint Eastwood", ]

function renderButtons() {
    $("#buttonList").empty();
    // Loop through the topics and generate buttons in the array
    for (var i = 0; i < topics.length; i++) {
        var addButton = $("<button>");
        addButton.addClass("movieButton btn btn-info m-1");
        addButton.attr("movie-animal", topics[i]);
        addButton.text(topics[i]);
        $("#buttonList").append(addButton);
    }
};

$(".submit").on("click", function(event) {
    event.preventDefault();
    // grab the text the user types into the input field
    var addMovie = $("#newMovie").val().trim();

    if (addMovie.length > 0 && (/^[a-zA-Z]+$/.test(addMovie))) {
        topics.push(addMovie);
        renderButtons();
    };
    $("#newMovie").val(" ");
});


$(document).on("click", ".movieButton", function() {
    $("#gifs-here").empty();
    var moviex = $(this).attr("movie-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + moviex + "&api_key=dc6zaTOxFJmzC&limit=10";

    $("#gif-label").text("10 Gifts: " + moviex.toUpperCase());

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item float-left ml-3'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var movieImage = $("<img>");
                movieImage.attr("src", results[i].images.fixed_height_still.url);

                movieImage.attr("data-still", results[i].images.fixed_height_still.url);
                movieImage.attr("data-animate", results[i].images.fixed_height.url);
                movieImage.attr("data-state", "still");
                movieImage.addClass("gif");


                gifDiv.prepend(p);
                gifDiv.prepend(movieImage);

                $("#gifs-here").prepend(gifDiv);
            }
        });
});



$(document).on("click", ".gif", function() {
    console.log("gif was clicked");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


renderButtons();


