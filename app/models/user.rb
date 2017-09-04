class User < ApplicationRecord
  has_many :articles, dependent: :destroy
  has_many :login_providers, dependent: :destroy

  typed_store :settings do |s|
    s.string :theme, default: 'light', null: false
    s.string :font_size, default: 'small', null: false
  end

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :omniauthable, :omniauth_providers => [:facebook]
end
