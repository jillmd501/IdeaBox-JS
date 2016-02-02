$(document).ready(function(){
    fetchIdeas();
    createIdea();
    deleteIdea();
    editIdea();
});


function renderIdeas(idea) {
  $("#latest-ideas").prepend(
    "<div class='idea' data-id='" + idea.id + "'> "
    + "<h4>"
    + idea.title
    + "</h4>"
    + "<p>"
    + idea.body
    + "</p>"
    + "<h5>"
    + idea.quality
    + "</h5>"
    + "<div class='btn btn-default' id='delete-idea'>Delete</div>"
    + "<div class='btn btn-default' id='edit-idea'>Edit</div>"
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
    $('#latest-ideas').delegate('#delete-idea', 'click', function() {
      var $idea = $(this).closest('.idea')
      $.ajax({
        type: 'DELETE',
        url:  '/api/v1/ideas/' + $idea.attr("data-id") + '.json',
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


  function editIdea() {
    $('#latest-ideas').delegate('#edit-idea', 'click', function() {
      var $idea = $(this).closest(".idea");
      @rrgayhart
      // it says 'Uncaught TypeError: Cannot set property 'contentEditable' of null'
      document.getElementById("idea-title" + $idea.attr('data-id')).contentEditable = true;
      document.getElementById("idea-body" + $idea.attr('data-id')).contentEditable = true;

      $(".saveIdeaButton").click(function(){
        document.getElementById("idea-title" + $idea.attr('data-id')).contentEditable = false;
        document.getElementById("idea-body" + $idea.attr('data-id')).contentEditable = false;
        $(".saveIdeaButton").remove();
        var ideaParams = {
          idea: {
            id: $idea.attr('data-id'),
            title: $("#idea-title" + $idea.attr('data-id')).text(),
            body: $("#idea-body" + $idea.attr('data-id')).text()
          }
        }

        $.ajax({
          type: 'PUT',
          url: '/api/v1/ideas/' + $idea.attr('data-id'),
          data: ideaParams,
          success: function() {
            fetchIdeas();
          },
          error: function(xhr) {
            console.log(xhr.responseText)
          }
        });
      });
    });
  };

var Cam = {
  genius: "genius",
  plausible: "genius",
  swill: "plausible"
}

var Peyton = {
  genius: "plausible",
  plausible: "swill",
  swill: "swill"
}
