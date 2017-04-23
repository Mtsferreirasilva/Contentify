Rails.application.routes.draw do
  root to: 'homepage#index'

  get 'auth/google_oauth2/callback', to: 'sessions#create'
  get 'signout', to: 'sessions#destroy', as: 'signout'
  get 'auth/failure', to: redirect('/')

  resources :reader, only: [:index]
  resources :library, only: [:index]
end
