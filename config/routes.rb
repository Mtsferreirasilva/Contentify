Rails.application.routes.draw do
  root to: 'homepage#index'

  get "*any", via: :all, to: "errors#not_found"

  get 'auth/facebook/callback', to: 'sessions#create'
  get 'auth/google_oauth2/callback', to: 'sessions#create'
  get 'signout', to: 'sessions#destroy', as: 'signout'
  get 'auth/failure', to: redirect('/')

  resources :reader, only: [:index]
  resources :library, only: [:index]
end
