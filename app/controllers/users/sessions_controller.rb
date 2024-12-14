# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  skip_before_acti  on :authenticate_user!, only: [:create]

  def create
    user = User.find_by(email: params[:email])

    if user && user.valid_password?(params[:password])
      if user.expires_at && user.expires_at > Time.now
        token = JwtService.encode(user_id: user.id)  # Generate JWT token
        render json: {  token: token }, status: :ok
      else
        render json: { error: "Account has expired. Please renew your subscription." }, status: :unauthorized
      end
    else
      render json: { error: "Invalid email or password." }, status: :unauthorized
    end
  end
end
