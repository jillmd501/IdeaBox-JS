$(document).ready(function(){
    listIdeas();
});

function listIdeas(){
  $.getJSON('/api/v1/ideas', function(data) {
    $.each(data, function(index, idea){
      renderIdeas(idea)
    })
  });
};

function renderIdeas(idea){
  $('#idea-index').append(
    idea.title
  )};
