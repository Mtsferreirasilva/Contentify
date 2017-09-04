# frozen_string_literal: true
module Users
  class SettingsController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:update]
    before_action :authenticate_user!, :set_user, only: [:update]

    def update
      respond_to do |format|
        if @user.update(font_size: setting_params[:font_size], theme: setting_params[:theme])
          format.json { render json: { status: "created"  } }
        else
          format.json { render json: { status: "unprocessable_entity"  } }
        end
      end
    end

    private

    def setting_params
      params.permit(:font_size, :theme)
    end

    def set_user
      @user = User.find(current_user.id)
    end
  end
end
