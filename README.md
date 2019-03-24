# gifTastic

This app will take the topics in this array and create buttons in the HTML.

Using a loop that appends a button for each string in the array.

When the user clicks on a button, the page will grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

When the user clicks one of the still GIPHY images, the gif will animate. If the user clicks the gif again, it will stop playing.

Under every gif, displays its rating (PG, G, so on).

This data is provided by the GIPHY API.

A form takes the value from a user input box and adds it into the topics array. Then a function call takes each topic in the array remakes the buttons on the page and grabs the 10 static gifs on new button click.
