class Users::SessionsController < Devise::SessionsController
  def destroy
    # session[:user_id] = nil
    binding.pry
    redirect_to root_path
  end
end
