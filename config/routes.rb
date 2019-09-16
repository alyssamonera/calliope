Rails.application.routes.draw do

  # root
  root 'site#index'

  # RESTFUL routes for PROMPTS
  get '/api/prompts', to: 'prompts#index'
  get '/api/prompts/:id', to: 'prompts#show'
  post '/api/prompts', to: 'prompts#create'
  put '/api/prompts/:id', to: 'prompts#update'
  delete '/api/prompts/:id', to: 'prompts#delete'

  # RESTFUL routes for USERS
  get '/api/login/:username', to: 'users#findId'
  post '/api/signup', to: 'users#create'

  # RESTFUL routes for REPLIES
  get '/api/prompts/:promptId/replies', to: 'replies#index'
  get '/api/replies/:id', to: 'replies#show'
  post '/api/replies', to: 'replies#create'
  delete '/api/replies/:id', to: 'replies#delete'
  put '/api/replies/:id', to: 'replies#update'

  get '*path', to: 'site#index'

end
