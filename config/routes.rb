Rails.application.routes.draw do
  resources :reader, only: [:index]
end
