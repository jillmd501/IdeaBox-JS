require 'test_helper'

class VisitHomepageTest < ActionDispatch::IntegrationTest
  test 'homepage partial can load with ajax calls' do
    visit '/'

    assert page.has_content?("pantherIDEAS")
    end

  test 'averages partial can load with ajax calls' do
    visit '/'

    sleep(10)
    assert page.has_content?("Team Leaderboard")

    within "#leaderboard-averages" do
      assert page.has_css?("#avatar")
      assert page.has_css?("#rating_average")
    end
  end
end
