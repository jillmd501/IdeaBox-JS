require 'test_helper'

class Api::V1::IdeasControllerTest < ActionController::TestCase
  test "#index responds to json" do
    get :index, format: :json
    assert_response :success
  end

  test "#index returns an array of records" do
    get :index, format: :json
    assert_kind_of Array, json_response[:leaderboard][:members]
  end

  test "#index returns the correct number of items" do
    get :index, format: :json
    assert_equal 11, json_response[:leaderboard][:members].count
  end

  test "#index contains ratings that have the correct properties" do
    get :index, format: :json

    json_response[:leaderboard][:members].each do |rating|
      assert rating[:id]
      assert rating[:name]
      assert rating[:avatar]
      assert rating[:ratings_average]
    end
  end

end
