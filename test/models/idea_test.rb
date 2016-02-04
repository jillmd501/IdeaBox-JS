require "test_helper"

class IdeaTest < ActiveSupport::TestCase
  attr_reader :idea

  def setup
    @idea = Idea.find_or_create_by(title: "test", body: "testing time")
  end

  test "an idea exists" do
    assert_equal "test", idea.title
  end

  test "an idea has a default quality of swill" do
    assert_equal "swill", idea.quality
  end

  test "an idea has a body" do
    assert_equal "testing time", idea.body
  end

  test "a quality of plausible is 1" do
    idea = Idea.create(title: "test", body: "body", quality: 1)

    assert_equal "1", idea.quality
  end

  test "a quality of genius is 2" do
    idea = Idea.create(title: "test", body: "body", quality: 2)

    assert_equal "2", idea.quality
  end
end
