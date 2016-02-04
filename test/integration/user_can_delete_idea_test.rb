require "test_helper"

class UserCanDeleteIdeaTest < ActionDispatch::IntegrationTest

  test "user can delete an idea" do
      visit "/"
      fill_in("idea-title", with: "Kueghly")
      fill_in("idea-body", with: "Cam Newton is my hero and I do not care who knows it! SUPER BOWL 50 WHOOOOOOOOOOO YAYYYYYYYYYYYYYYYYYY")
      click_on("New Idea")
      first("#delete-idea").click
      assert page.has_content?("4 prez")
  end
end
