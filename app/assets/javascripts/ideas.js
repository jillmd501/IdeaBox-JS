$(document).ready(function(){
    fetchIdeas();
    createIdea();
    deleteIdea();
    editIdea();
    searchIdeas();
    thumbsUp();
    searchIdeas();
    thumbsDown();
    truncate();
});


function renderIdeas(idea) {
  $("#latest-ideas").prepend(
    "<div class='idea' id='idea-id-" + idea.id + "' data-id='" + idea.id + "'> " +
      "<h4>" + idea.title + "</h4>" +
      "<p>" + truncate(idea.body) + "</p>" +
      "<h5 contentEditable=false id='idea-quality-" + idea.id + "'>" + idea.quality + "</h5>" +
      "<div class='btn btn-default' id='delete-idea'>Delete</div>" +
      "<div class='btn btn-default' id='edit-idea'>Edit</div>" +
      "<div class='btn btn-default' id='save-idea'>Save</div>" +
      "<i class='small material-icons' id='good-quality'>thumb_up</i>" +
      "<i class='small material-icons' id='bad-quality'>thumb_down</i>" +
    "</div>"
    )
  }

function fetchIdeas() {
  var newestIdeaID = parseInt($(".idea").last().attr("data-id"))
  $.ajax({
    type:    "GET",
    url:     "/api/v1/ideas.json",
    success: function(ideas) {
      $.each(ideas, function(index, idea) {
        if (isNaN(newestIdeaID) || idea.id > newestIdeaID) {
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

function truncate(body) {
  if (body.length > 100) {
    var smallBody = body.substring(0,98);
    return smallBody.substring(0, Math.min(smallBody.length, smallBody.lastIndexOf(' '))) + '...'
  } else {
    return body
  };
}

  function deleteIdea() {
    $('#latest-ideas').on('click', '#delete-idea', function() {
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
    $('#latest-ideas').on('click','#edit-idea', function() {
      var $idea = $(this).closest(".idea");
      document.getElementById("idea-id-" + $idea.attr('data-id')).contentEditable = true;
      $("#save-idea").click(function(){
        document.getElementById("idea-id-" + $idea.attr('data-id')).contentEditable = false;
        $("#save-idea").disable();
        var ideaParams = {
          idea: {
            id: $idea.attr('data-id'),
            title: $("#idea-id-" + $idea.attr('data-id')).text(),
            body: $("#idea-id-" + $idea.attr('data-id')).text()
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

  function searchIdeas() {
  $("#filter").keyup(function(){
		var filter = $(this).val();
		$("#latest-ideas").children().each(function(){
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).fadeOut();
			} else {
				$(this).show();
			}
		});
	});
}

function thumbsUp() {
  $("#latest-ideas").on('click', '#good-quality', function() {
    var $idea = $(this).closest(".idea")
    var idea_quality = $("#idea-quality-" + $idea.attr("data-id")).text()
      if (idea_quality === 'swill') {
        idea_quality = 'plausible';
      }
      else {
        idea_quality = 'genius';
      }

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + $idea.attr('data-id'),
      data: {idea: { quality: idea_quality} } ,
      success: function() {
        $("#idea-quality-" + $idea.attr("data-id")).html(idea_quality);
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    });
  }
)};

function thumbsDown() {
  $("#latest-ideas").on('click', '#bad-quality', function() {
    var $idea = $(this).closest(".idea")
    var idea_quality = $("#idea-quality-" + $idea.attr("data-id")).text()
      if (idea_quality === 'genius') {
        idea_quality = 'plausible';
      }
      else {
        idea_quality = 'swill';
      }
    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + $idea.attr('data-id'),
      data: {idea: { quality: idea_quality} },
      success: function() {
        $("#idea-quality-" + $idea.attr("data-id")).html(idea_quality);
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    });
  }
)};
