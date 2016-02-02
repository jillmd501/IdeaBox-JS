$(document).ready(function(){
    listIdeas();
    fetchIdeas();
});

function listIdeas(){
  $.getJSON('/api/v1/ideas', function(data) {
    $.each(data, function(index, idea){
      renderIdeas(idea)
    })
  });
};

function renderIdeas(idea) {
  $("#latest-ideas").append(
    "<div class='idea' id='" + idea.id + "'> "
    + "<h4>"
    + idea.title
    + "</h4>"
    + "<p>"
    + idea.body
    + "</p>"
    + "<h5>"
    + idea.quality
    + "</h5>"
    + "</div>"
    )
}

function fetchIdeas() {
  var newestIdeaID = parseInt($(".idea").last().attr("data-id"))
  $.ajax({
    type:    "GET",
    url:     "/api/v1/ideas.json",
    success: function(ideas) {
      $.each(ideas, function(index, idea) {
        if (isNaN(newestIdeaID) || idea.id > newestItemID) {
          renderIdeas(idea)
        }
      })
    },
    error: function(xhr) {
      console.log(xhr.responseText)
    }
  })
}

var thumbsUp = {
  genius: "genius",
  plausible: "genius",
  swill: "plausible"
}

var thumbsDown = {
  genius: "plausible",
  plausible: "swill",
  swill: "swill"
}
