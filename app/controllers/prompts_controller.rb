class PromptsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Prompt.all
  end

  def create
    render json: Prompt.create(params["prompt"])
  end

end
