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
  get '/login/:username', to: 'users#findId'
  post '/signup', to: 'users#create'

  # RESTFUL routes for REPLIES
  get '/prompts/:promptId/replies', to: 'replies#index'
  get '/replies/:id', to: 'replies#show'
  post '/replies', to: 'replies#create'
  delete '/replies/:id', to: 'replies#delete'

end
