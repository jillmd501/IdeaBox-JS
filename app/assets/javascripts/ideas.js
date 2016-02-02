$(document).ready(function(){
    listIdeas();
    fetchIdeas();
    createIdea();
    deleteIdea();
});

function listIdeas(){
  $.getJSON('/api/v1/ideas', function(data) {
    $.each(data, function(index, idea){
      renderIdeas(idea)
    })
  });
};

function renderIdeas(idea) {
  $("#latest-ideas").prepend(
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
    + "<div class='btn btn-default' id='delete-idea'>Delete</div>"
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

function createIdea() {
  $("#create-idea").on("click", function() {
    var ideaParams = {
      idea: {
        title: $("#idea-title").val(),
        body: $("#idea-body").val()
      }
    }

  $("#idea-title").val('')
  $("#idea-body").val('')

  $.ajax({
    type:    "POST",
    url:     "/api/v1/ideas.json",
    data:    ideaParams,
    success: function(newIdea) {
      renderIdeas(newIdea)
    },
    error: function(xhr) {
      console.log(xhr.responseText)
    }
    })
  })
};

  function deleteIdea() {
    $('#delete-idea').on('click', function() {
      var $idea = $(this).closest('.idea')
      $.ajax({
        type: 'DELETE',
        url:  '/api/v1/ideas/' + $idea.data("id") + '.json',
        success: function(){
          $idea.remove()
        },
        error: function(){
          $idea.remove()
          console.log('Sorry, idea has already deleted.')
        }
      })
    })
  }

// not sure what to do with this yet
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
