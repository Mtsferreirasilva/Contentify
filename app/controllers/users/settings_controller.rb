class Users::SettingsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:update]
  before_action :authenticate_user!
  before_action :set_setting

  def update
    respond_to do |format|
      if @setting.update(setting_params)
        format.json { render json: { status: "created"  } }
      else
        format.json { render json: { status: "unprocessable_entity"  } }
      end
    end
  end

  private

  def setting_params
    params.require(:setting).permit(:font_size, :theme)
  end

  def set_setting
    @setting = Setting.find(user_id: current_user.id)
  end
end
