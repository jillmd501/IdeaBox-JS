class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def create
  @idea = Idea.new(idea_params)
    if @idea.save
      respond_with :api, :v1, @idea
    else
      # do something
    end
  end
  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end
