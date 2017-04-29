Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  root to: 'homepage#index'

  match '/500', to: 'errors#internal_server_error', via: :all
  %w( 404 422 503 ).each do |code|
    get code, to: 'errors#show', code: code
  end

  resources :reader, only: [:index]
  resources :library, only: [:index]
end
