Rails.application.routes.draw do

  # root

  # RESTFUL routes
  get '/prompts', to: 'prompts#index'
  post '/prompts', to: 'prompts#create'

end
