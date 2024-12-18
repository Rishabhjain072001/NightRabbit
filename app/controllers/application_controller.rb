class ApplicationController < ActionController::API
  before_action :authenticate_user!

  skip_before_action :authenticate_user!, only: [:frontend]

  def frontend
    send_file Rails.root.join('public', 'index.html'), type: 'text/html', disposition: 'inline'
  end

  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last  # Extract the token from the header

    if token.nil? || decoded_token.nil?
      render json: { error: 'Not Authenticated' }, status: :unauthorized
    else
      @current_user = User.find_by(id: decoded_token['user_id'], jti: decoded_token[:jti])
      render json: { error: 'Invalid token' }, status: :unauthorized if @current_user.nil?
    end
  end

  private

  def decoded_token
    token = request.headers['Authorization']&.split(' ')&.last
    return nil unless token

    JwtService.decode(token)&.with_indifferent_access  # Decode the token using JwtService
  end
end
