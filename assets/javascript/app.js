$(document).ready()

  var displayedButtons = ["Harry Potter", "Hermione Granger", "Ron Weasley", "Albus Dumbledore", "Rubeus Hagrid"];

  function displayImage(){

    $("#display-images").empty();
    var input = $(this).attr("data-name");
    var limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=Pf6qkEL5g4Sla18HIcm9Ap9Ag0TLMpj8";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
      for (var j = 0; j < limit; j++){
        var dislayDiv = $("<div>");
        dislayDiv.addClass("holder");

        var image = $("<img>");
        image.attr("src", response.data[j].images.original_still.url);
        image.attr("data-still", response.data[j].images.original_still.url);
        image.attr("data-animate", response.data[j].images.original.url);
        image.attr("data-state", "still");
        image.attr("class", "gif");
        dislayDiv.append(image);

        var rating = response.data[j].rating;
        console.log(response);
        var pRating = $("<p>").text("Rating: " + rating);
        dislayDiv.append(pRating)

        $("#display-images").append(dislayDiv);
      }
    });
  }

  function renderButtons(){

    $("#display-buttons").empty();

    for (var i = 0; i < displayedButtons.length; i++){

      var newButton = $("<button>");
      newButton.attr("class", "btn btn-default");
      newButton.attr("id", "input");
      newButton.attr("data-name", displayedButtons[i]);
      newButton.text(displayedButtons[i]);
      $("#display-buttons").append(newButton);

    }
  }

  function imageState(){

    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

      if (state === "still"){
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
      }
      else if(state == "animate"){
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still")
      }

  var maxLeft = _left_border - $('#selectedElement').width(); // counter intuitively this is actually the right border
  var maxTop = _top_border  - $('#selectedElement').height();
  var animationDurration = _duration;

  function randomAnimation(){
    var randomLeft = Math.floor(Math.random()*maxLeft);
    var randomTop = Math.floor(Math.random()*maxTop);

  $('#selectedElement').animate({
     left: randomLeft,
     top: randomTop
   }, animationDurration, function() {
     randomAnimation();
   });
}
  }

  $("#submit").on("click", function(){

    var input = $("#user-input").val().trim();
    form.reset();
    displayedButtons.push(input);

    renderButtons();

    return false;
  })

  renderButtons();

  $(document).on("click", "#input", displayImage);
  $(document).on("click", ".gif", imageState);





// $("button").on("click", function() {
//   var person = $(this).attr("data-person");
//   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//     person + "&api_key=Pf6qkEL5g4Sla18HIcm9Ap9Ag0TLMpj8";

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//     .then(function(response) {
//       var results = response.data;

//       for (var i = 0; i < results.length; i++) {
//         var gifDiv = $("<div>");

//         var rating = results[i].rating;

//         var p = $("<p>").text("Rating: " + rating);

//         var personImage = $("<img>");
//         personImage.attr("src", results[i].images.fixed_height.url);

//         gifDiv.prepend(p);
//         gifDiv.prepend(personImage);

//         $("#gifs-appear-here").prepend(gifDiv);
//       }
//     });
// });
