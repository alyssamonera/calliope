class RepliesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Reply.all(params["promptId"])
  end

end
