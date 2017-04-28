# frozen_string_literal: true
class ApplicationController < ActionController::Base
  HEROKU_HOST = 'contentify.herokuapp.com'
  PREFERED_HOST = 'www.contentify.io'

  before_filter :redirect_to_prefered_host

  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  private

  def redirect_to_prefered_host
    if Rails.env.production? && request.host == HEROKU_HOST
      redirect_to(host: PREFERED_HOST)
    end
  end
end
