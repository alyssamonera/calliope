class RepliesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Reply.all(params["promptId"])
  end

  def show
    render json: Reply.find(params["id"])
  end

  def create
    params["reply"]["title"].gsub! "'", "''"
    params["reply"]["body"].gsub! "'", "''"
    render json: Reply.create(params["reply"])
  end

end
