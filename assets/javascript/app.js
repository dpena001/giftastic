//VARIABLES

var topics = ["Health","Games","Autos","IT Tech","Sport","Home","Recreation"];
//var topic = "";

function renderButtons() {
  $("#button-area").empty();
     // Loop through the array of topics, then generate buttons for each topic in the array
    for (var i = 0; i < topics.length; i++) {
      $("#button-area").append('<button class="btn btn-primary btn-md topic" value="'+topics[i]+'">'+topics[i]+'</button>');
      $("#button-area").append(" ");
    }
};


$("#add-topic").on("click", function(event) {
   event.preventDefault();

   var btntext = $("#topic-input").val();

   if (btntext !== ""){

   	topics[topics.length] = btntext;
   		
   }
   
   renderButtons();
});


   function displayimages() {
 	
 	$('.render-area').empty();

 	var topic = $(this).attr('value');

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {

          var results = response.data;

          console.log(results.length);

          for (var i = 0; i < results.length; i++) {
            
            var gifDiv = $('<div class="items">');

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating.toUpperCase());

            var topicsImage = $("<img>");

            //topicsImage.attr("src", results[i].images.fixed_height.url);
            topicsImage.attr("src", results[i].images.fixed_height_still.url);
            topicsImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicsImage.attr("data-animate", results[i].images.fixed_height.url);
            topicsImage.attr("data-state", "still");
            topicsImage.addClass("gif");

            gifDiv.prepend(topicsImage);
            gifDiv.prepend("<br>");
            gifDiv.prepend(p);

            $(".render-area").prepend(gifDiv);
          }
       });
     };
 	  
      function startpause () {
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
    
     };


$(document).ready(function() {    

  $(document).on("click", ".topic", displayimages);

  renderButtons();

  $(document).on("click", ".gif", startpause);

});