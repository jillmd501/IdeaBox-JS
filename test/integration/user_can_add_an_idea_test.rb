require 'test_helper'

class AddNewIdeasTest < ActionDispatch::IntegrationTest

  test '#can create idea' do
    idea = Idea.new(title: "Kueghly", body: "is a dreamboat.")

    visit '/'

    within "#latest-ideas" do
    assert page.has_content?("Kueghly")
    end
  end
end
