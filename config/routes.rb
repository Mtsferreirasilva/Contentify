Rails.application.routes.draw do
  root to: 'homepage#index'

  match '/500', to: 'errors#internal_server_error', via: :all
  %w( 404 422 503 ).each do |code|
    get code, to: 'errors#not_found', code: code
  end

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  post 'settings', to: 'users/settings#update'

  resources :reader, only: [:index] do
    collection do
      post :save_article
    end
  end
  resources :library, only: [:index]
end
