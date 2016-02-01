class Api::V1::IdeaController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end
end
