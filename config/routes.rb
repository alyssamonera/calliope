Rails.application.routes.draw do

  # root
  root 'site#index'

  # RESTFUL routes for PROMPTS
  get '/prompts', to: 'prompts#index'
  get '/prompts/:id', to: 'prompts#show'
  post '/prompts', to: 'prompts#create'
  put '/prompts/:id', to: 'prompts#update'
  delete '/prompts/:id', to: 'prompts#delete'

  # RESTFUL routes for USERS
  post '/signup', to: 'users#create'

end
