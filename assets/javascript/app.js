$(document).ready()

  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if(!isChrome){
    $('#iframeAudio').remove()
  }
  else{
  $('#playAudio').remove() //just to make sure that it will not have 2x audio in the background
  };

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

      if (state === "still"){
        console.log("still")
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
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

  var NavWidth = $(window).width();
  var NavHeight = $(window).height();
  var x = NavWidth / 2;
  var y = NavHeight / 2;
  var rotation = 0;
  var crit = 0;
  function walk() {
    var random = Math.floor(Math.random() * 360);
    while (rotation - 90 - random > 45 || rotation - 90 - random < -45) {
      random = Math.floor(Math.random() * 360);
      if (
        x + Math.cos(random / 180 * Math.PI) * 50 < 0 ||
        y + Math.sin(random / 180 * Math.PI) * 50 < 0 ||
        x + Math.cos(random / 180 * Math.PI) * 50 > NavWidth ||
        y + Math.sin(random / 180 * Math.PI) * 50 > NavHeight
      ) {
        random += 180;
        break;
      }
      if (crit > 10) {
        break;
      }

      crit++;
    }
    crit = 0;
    x = x + Math.cos(random / 180 * Math.PI) * 50;
    y = y + Math.sin(random / 180 * Math.PI) * 50;
    rotation = random + 90;
    var footprint1 = document.createElement("img");
    footprint1.setAttribute(
      "src",
      "assets/images/rightfoot.png"
    );
    var footprint2 = document.createElement("img");
    footprint2.setAttribute(
      "src",
      "assets/images/leftfoot.png"
    );
    footprint1.style.position = "absolute";
    footprint1.style.left = x + "px";
    footprint1.style.top = y + "px";
    footprint1.className = "footprint";
    footprint1.style.webkitTransform = "rotate(" + rotation + "deg)";
    document.body.appendChild(footprint1);
    footprint2.style.position = "absolute";
    footprint2.style.left = x + "px";
    footprint2.style.top = y + "px";
    footprint2.className = "footprint";
    footprint2.style.webkitTransform = "rotate(" + rotation + "deg)";
    setTimeout(function(){
      document.body.appendChild(footprint2);
    }, 500)
  }
  setInterval(function() {
    walk();
  }, 1000);
