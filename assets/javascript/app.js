 $(function(){
     populateBtn(Arr, "searchButton", "#button_A")
 })
 var Arr=["Doge", "Pomeranian", "Golden Retriever"]
 function populateBtn(Arr,classToAdd, areaToAddTo){
    //empty previous array 
    $(areaToAddTo).empty();

    for(var i= 0; i < Arr.length; i++){
        var button = $("<button>");
        button.addClass(classToAdd)
        button.attr("data-type", Arr[i]);
        button.text(Arr[i])
        $(areaToAddTo).append(button)
    }
 }
 
    // Adding click event listen listener to all buttons
    $(document).on("click",".searchButton", function() {



        
    // Grabbing and storing the data-animal property value from the button
    var dogs = $(this).data("type");
    console.log(dogs);
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      dogs + "&api_key=ECMpc8I8Loi0M4EOA3zUO2iSD1E9PbfE&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;
        $("#gifs-appear-here").empty();
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var animalDiv = $("<div class='search-item'>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          // Creating and storing an image tag
          var animalImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", still);

          animalImage.attr("data-still", still);
          animalImage.attr("data-animated", animated);
          animalImage.attr("data-state", "still");
          animalImage.addClass("search-image");

          // Appending the paragraph and image tag to the animalDiv
          animalDiv.append(p);
          animalDiv.append(animalImage);
         

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").append(animalDiv);
        }
      });
  });

  $(document).on("click", ".search-image", function(){
      var state = $(this).attr("data-state")
      console.log(state);
      console.log(this);
      if(state === "still"){
          $(this).attr("src", $(this).data("animated"));
          $(this).attr("data-state", "animated");
      }else if (state === "animated"){
        $(this).attr("src", $(this).data("still"));
          $(this).attr("data-state", "still");
      }

      
  })

  $("#addSearch").on("click", function(event) {

    event.preventDefault();

   var newSearch = $("input").eq(0).val(); 

   Arr.push(newSearch);

   populateBtn(Arr, "searchButton", "#button_A");

  });