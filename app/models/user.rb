class User < ApplicationRecord
  has_many :articles, dependent: :destroy
  has_many :login_providers, dependent: :destroy
  has_one :setting, dependent: :destroy
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :omniauthable, :omniauth_providers => [:facebook]
end
