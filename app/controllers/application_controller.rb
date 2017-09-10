# frozen_string_literal: true
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :set_user, :show_feature

  def set_user
    @user = User.where(id: current_user&.id).first_or_initialize
  end

  def show_feature
    @show_feature = ENV.fetch('SHOW_FEATURE') == 'true'
  end
end
