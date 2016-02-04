require 'test_helper'

class VisitHomepageTest < ActionDispatch::IntegrationTest
  test 'homepage partial can load with ajax calls' do
    visit '/'

    assert page.has_content?("pantherIDEAS")
    end
  end
