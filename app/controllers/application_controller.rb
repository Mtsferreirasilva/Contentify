# frozen_string_literal: true
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_filter :set_setting, :show_feature

  def set_setting
    @setting = if current_user
      Setting.find_by(user_id: current_user.id)
    else
      Setting.new(font_size: 'normal', theme: 'light')
    end
  end

  def after_sign_in_path_for(resource)
    request.env['omniauth.origin'] || stored_location_for(resource) || root_path
  end

  def show_feature
    @show_feature = ENV.fetch('SHOW_FEATURE') == 'true'
  end
end
