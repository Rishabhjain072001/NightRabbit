class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  private

  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last

    if token.blank? || decoded_token.blank?
      render_unauthorized('Not Authenticated')
    else
      @current_user = User.find_by(id: decoded_token['user_id'], jti: decoded_token[:jti])
      
      if @current_user.nil?
        render_unauthorized('Invalid token')
      elsif @current_user.last_ip && @current_user.last_ip != request.remote_ip
        render_unauthorized('Logged in on another device.')
      elsif @current_user.expired?
        render_unauthorized('Your login credentials have expired. Please contact admin for new credentials.')
      end
    end
  end

  def decoded_token
    token = request.headers['Authorization']&.split(' ')&.last
    return nil unless token

    JwtService.decode(token)&.with_indifferent_access  # Decode the token using JwtService
  end

  def render_unauthorized(message)
    render json: { error: message }, status: :unauthorized
  end
end
