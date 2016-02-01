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

function renderAverages(average){
  $('#leaderboard-averages').append("<div class='container'><div class='row'><div class='col s4 offset-s1'><img src='"
     + average.avatar.avatar.large.url + "' id = 'avatar' class='circle'></div><div class='col s4'><span class='agent_name'>"
     + average.name + "</span><br></div><div id='rating_average' class='col s3'>"
     + average.ratings_average.toFixed(2) + "</div></div></div><br>"
  )}
