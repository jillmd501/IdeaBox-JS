require 'test_helper'

class Api::V1::IdeasControllerTest < ActionController::TestCase
  test "#index responds to json" do
    get :index, format: :json
    assert_response :success
  end

  test "#index returns an array of records" do
    get :index, format: :json
    assert_kind_of Array, json_response[:idea]
  end

  test "#index returns the correct number of items" do
    get :index, format: :json
    assert_equal 11, json_response[:idea_params].count
  end

  test "#index contains ratings that have the correct properties" do
    get :index, format: :json

    json_response[:idea].each do |rating|
      assert idea[:title]
      assert idea[:body]
      assert idea[:quality]
    end
  end

end
