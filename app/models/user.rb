class User < ApplicationRecord
  has_many :articles, dependent: :destroy
  has_one :setting
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :omniauthable, :omniauth_providers => [:facebook, :google_oauth2]
  class << self
    def from_omniauth(auth)
      user = User.find_by(email: auth.info.email)
      if user
        user.email = auth.info.email
        user.name = auth.info.name
        user.image = auth.info.image
        user.uid = auth.uid
        user.provider = auth.provider
        user
      else
        where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
          user.email = auth.info.email
          user.password = Devise.friendly_token[0,20]
          user.name = auth.info.name
          user.image = auth.info.image
        end
      end
    end
  end
end
