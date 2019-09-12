class PromptsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Prompt.all
  end

  def create
    params["prompt"]["title"].gsub! "'", "''"
    params["prompt"]["body"].gsub! "'", "''"
    render json: Prompt.create(params["prompt"])
  end

  def show
    render json: Prompt.find(params["id"])
  end

  def update
    params["prompt"]["title"].gsub! "'", "''"
    params["prompt"]["body"].gsub! "'", "''"
    render json: Prompt.update(params["id"], params["prompt"])
  end

  def delete
    render json: Prompt.delete(params["id"])
  end

end
