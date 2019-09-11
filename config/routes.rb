Rails.application.routes.draw do

  # root

  # RESTFUL routes
  get '/prompts', to: 'prompts#index'
  get '/prompts/:id', to: 'prompts#show'
  post '/prompts', to: 'prompts#create'
  put '/prompts/:id', to: 'prompts#update'

end
