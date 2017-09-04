# frozen_string_literal: true
module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def facebook
      provider = LoginProvider.where(name: auth.provider, uid: auth.uid).first

      if provider.present?
        user = provider.user
      else
        user = User.create(
          email: auth.info.email,
          name: auth.info.name,
          image: auth.info.image,
          password: Devise.friendly_token[0,20]
        )

        user.login_providers.create(
          name: auth.provider,
          uid: auth.uid,
          access_token: auth.credentials.token,
          expires_at: Time.at(auth.credentials.expires_at),
        )

        user.build_setting(font_size: 'normal', theme: 'light')
        user.save
      end

      sign_in_and_redirect user, event: :authentication
    end

    def failure
      redirect_to root_path
    end

    private

    def auth
      request.env['omniauth.auth']
    end
  end
end
