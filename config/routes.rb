Rails.application.routes.draw do
  root to: 'homepage#index'

  %w( 404 422 500 503 ).each do |code|
    get code, to: 'errors#show', code: code
  end

  get 'auth/facebook/callback', to: 'sessions#create'
  get 'auth/google_oauth2/callback', to: 'sessions#create'
  get 'signout', to: 'sessions#destroy', as: 'signout'
  get 'auth/failure', to: redirect('/')

  resources :reader, only: [:index]
  resources :library, only: [:index]
end
