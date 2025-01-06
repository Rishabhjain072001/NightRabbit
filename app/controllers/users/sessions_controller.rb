# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  protect_from_forgery with: :null_session, if: -> { request.format.json? }

  respond_to :json
  skip_before_action :authenticate_user!, only: [:create]
  skip_before_action :verify_signed_out_user, only: [:destroy]

  def create
    user = User.find_by(email: params[:email])

    if user && user.valid_password?(params[:password])
      if user.expires_at && user.expires_at > Time.now
        token = JwtService.encode({ user_id: user.id, jti: user.jti })  # Generate JWT token
        render json: {  token: token, user: user }, status: :ok
      else
        render json: { error: "Account has expired. Please contact admin!" }, status: :unauthorized
      end
    else
      render json: { error: "Invalid email or password." }, status: :unauthorized
    end
  end

  def destroy
    user = current_user
    if user
      User.revoke_jwt(user)
      sign_out(user)
    end

    render json: { message: 'Logged out successfully' }, status: :ok
  end

  def validate_token
    if current_user
      render json: { user: current_user }, status: :ok
    else
      render json: { error: 'Invalid or expired token' }, status: :unauthorized
    end
  end
end
