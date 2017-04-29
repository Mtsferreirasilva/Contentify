class ErrorsController < ApplicationController
  def not_found
    status_code = params[:code] || 404
    render status: status_code
  end

  def internal_server_error
    render status: 500
  end
end
