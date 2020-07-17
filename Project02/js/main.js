$(document).ready(function() {
  var topics = [];
  function displayGif() {
   var x = $(this).data("search");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=bBVbTjNtHZw7wzMYn6mRs1I1BEqIzlTJ&limit=20";
   $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
   var results = response.data;
   for (var i = 0; i < results.length; i++) {
     var showDiv = $("<div class='dvflex'>");
     var defaultAnimatedSrc = results[i].images.fixed_height.url;
     var staticSrc = results[i].images.fixed_height_still.url;
     var showImage = $("<img>");

     showImage.attr("src", defaultAnimatedSrc);
     showImage.addClass("foodGiphy");
     showImage.attr("data-state", "animate");
     showImage.attr("data-still", staticSrc);
     showImage.attr("data-animate", defaultAnimatedSrc);
     showDiv.append(showImage);
     $("#dvGif").prepend(showDiv);
   }
 });
}

$("#addFood").on("click", function(event) {
  event.preventDefault();
  var newShow = $("#foodInput").val().trim();
  topics.push(newShow);
  console.log(topics);
  $("#foodInput").val('');
  displayButtons();
});
function displayButtons() {
  $("#myButtons").empty();
  for (var i = 0; i < topics.length; i++) {
    var a = $('<button class="btn btn-success btnsearch">');
    a.attr("id", "show");
    a.attr("data-search", topics[i]);
    a.text(topics[i]);
    $("#myButtons").append(a);
  }
}


displayButtons();
$(document).on("click", "#show", displayGif);
$(document).on("click", ".foodGiphy", pausePlayGifs);
function pausePlayGifs() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

});