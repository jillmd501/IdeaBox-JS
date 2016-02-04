require 'test_helper'

class TruncateIdeaTest < ActionDispatch::IntegrationTest

test "ideas are truncated by the word when longer than 100 characters" do
    idea = Idea.new(title: 'panthers', body: "Cam Newton is my hero and I do not care who knows it! SUPER BOWL 50 WHOOOOOOOOOOO YAYYYYYYYYYYYYYYYYYY")
    idea.save
    visit "/"
  
    assert page.has_content?("Cam Newton is my hero and I do not care who knows it! SUPER BOWL 50 WHOOOOOOOOOOO...")
  end
end
