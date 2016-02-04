require 'SimpleCov'
SimpleCov.start('rails')

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest/pride'
require 'minitest/unit'
require 'mocha/mini_test'
require 'capybara/rails'


SimpleCov.start("rails")

class ActionDispatch::IntegrationTest
  include Capybara::DSL

  def setup
    Capybara.app = IdeaboxJsStyle::Application
    Capybara.current_driver = Capybara.javascript_driver
    Capybara.default_max_wait_time = 20
  end
end
