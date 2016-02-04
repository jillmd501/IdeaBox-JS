require 'test_helper'

class Api::V1::IdeasControllerTest < ActionController::TestCase
  test "#index responds to json" do
    get :index, format: :json
    assert_response :success
  end

  test "#index returns an array of records" do
     get :index, format: :json
     assert_kind_of Array, json_response
   end

   test "#index returns the correct number of ideas" do
     get :index, format: :json
     assert_equal Idea.all.count, json_response.count
   end

   test "#index contains ideas that have the correct properties" do
     get :index, format: :json

     json_response.each do |idea|
       assert idea[:title]
       assert idea[:body]
       assert idea[:quality]
     end
   end

   test "#create responds to json" do
     get :create, format: :json, idea: {title: 'one', body: 'text'}
     assert_response :success
   end

   test "#create returns one record with the correct data" do
     get :create, format: :json, idea: {title: 'one', body: 'text'}

     idea = Idea.find_by(title: 'one')

     assert_kind_of Hash, json_response
     assert_equal idea.id, json_response[:id]
     assert_equal 'one', json_response[:title]
     assert_equal 'text', json_response[:body]
   end

   test "#update responsds to json" do
    idea = Idea.create(title: 'testing_update', body: 'body')
    get :update, format: :json, id: idea.id, idea: {title: 'testing_update_worked'}
    assert_response :success
  end

end
