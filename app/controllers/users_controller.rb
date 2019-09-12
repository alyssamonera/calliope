class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    render json: User.create(params["user"])
  end

  def findId
    render json: User.find(params["username"])
  end

end
