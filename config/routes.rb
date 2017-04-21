Rails.application.routes.draw do
  root to: 'homepage#index'

  resources :reader, only: [:index]
  resources :library, only: [:index]
end
