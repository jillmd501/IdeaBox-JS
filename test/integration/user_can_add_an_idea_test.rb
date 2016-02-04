require 'test_helper'

class AddNewIdeasTest < ActionDispatch::IntegrationTest

  test '#can create idea' do
    visit '/'

    assert page.has_content?("Thoughts?")

    within "#save-idea" do
      fill_in "New Title", with: "Cam Newton"
      fill_in "New Description", with: "is the best quarterback in the NFL."
      click_button "New Idea"
    end

    within "#latest-ideas" do
      assert page.has_content?("Cam Newton")
      assert page.has_content?("is the best quarterback in the NFL.")
    end
  end
end
