var topics = [{ name: "Anthony+Rizzo", text: "Anthony Rizzo" }, { name: "Kris+Bryant", text: "Kris Bryant" }, { name: "Javier+Baez", text: "Javier Baez" }, { name: "Addison+Russell", text: "Addison Russell" }, { name: "Jon+Lester", text: "Jon Lester" },
{ name: "Kyle+Schwarber", text: "Kyle Schwarber" }, { name: "Ben+Zobrist", text: "Ben Zobrist" }, { name: "Joe+Maddon", text: "Joe Maddon" }, { name: "David+Ross", text: "David Ross" }, { name: "Wilson+Contreras", text: "Willson Contreras" }];

$(document).ready(function () {

    // Function for displaying the buttons
    function renderButtons() {

        //Deleting the buttons prior to adding new ones
        $("#buttons").empty();

        // Loop through each array item
        for (var i = 0; i < topics.length; i++) {

            // Dynamically generate buttons for each topic in the array
            // Create and store a button tag
            var topicDiv = $("<button>");

            // Adding a data-attribute with a value of the topic at index i
            topicDiv.attr("data-topic", topics[i].name);
            topicDiv.attr("data-state", "still");
            topicDiv.addClass("btn btn-danger font-weight-bold shadow rounded py-0");

            // Providing the button's text with a value of the topic at index i
            topicDiv.text(topics[i].text);
            // Append the topicDiv to the HTML page in the "#buttons" div
            $("#buttons").append(topicDiv);
        }
    }
    // Calling the renderButtons function at least once to display the initial list of topics
    renderButtons();

    //Add click event listen listener to all buttons
    $(document).on("click", "button", function () {
        // Grabbing and storing the data-topic property value from the button
        var topic = $(this).attr("data-topic");

        // Construct a queryURL using the player name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=Z6Nj3AkpF8ftYF13dNYJ8TGuAPz7fZHq&limit=10&sort=recent";

        // Perform an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the request
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                //Deleting the gifs prior to adding new ones
                //$("#gifs-appear-here").empty();

                // Loop through each array item
                for (var i = 0; i < results.length; i++) {

                    // Create and store a div tag
                    var topicDiv = $("<div id='images'>");

                    // Create and store a tag for the download button
                    var downloadButton = $("<a id='download' target='_blank'>").text("Download");
                    downloadButton.addClass("btn btn-danger font-weight-bold shadow rounded py-0 m-0 mt-1 float-right")
                    downloadButton.attr("href", results[i].images.original_mp4.mp4);
                    downloadButton.attr("download", "gif");

                    // Create a paragraph tag with the topic item's rating
                    var topicRating = $("<p class='float-left'>").text(("Rating: " + results[i].rating.toUpperCase()));

                    // Create and store an image tag
                    var topicImage = $("<img>");

                    // Adding a class
                    topicImage.addClass("gif");

                    // Adding a data-attribute with a value of the result image still/animate
                    topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-animate", results[i].images.fixed_height.url);
                    topicImage.attr("data-state", "still");

                    // Setting the src attribute of the image to a property pulled off the result item
                    topicImage.attr("src", results[i].images.fixed_height_still.url);

                    // Append the paragraph and image tags to the topicDiv
                    topicDiv.append(topicImage);
                    topicDiv.append(topicRating);
                    topicDiv.append(downloadButton);

                    // Append the topicDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(topicDiv);

                };

                // When an image is clicked
                $(".gif").on("click", function () {
                    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                    var state = $(this).attr("data-state");
                    // If the clicked image's state is still, update its src attribute to what its data animate value is
                    // Then, set the image's data-state to animate
                    // Else set src to the data-still value
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    };
                    console.log(this);
                });
            });
    });


    // This function handles events where the submit button is clicked
    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        
            // This line grabs the input from the textbox
            var topic = $("#user-input").val().trim();
            var topicName = topic.split(" ");
            var fullName = topicName[0] + "+" + topicName[1]

            if (topic !== ""){
            // Adding topic from the textbox to our array
            topics.push({ name: fullName, text: topic });
            };
            console.log(topic);
            // Calling renderButtons which handles the processing of our topics array
            renderButtons();
    });
});