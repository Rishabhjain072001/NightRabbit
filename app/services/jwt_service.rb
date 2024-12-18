# app/services/jwt_service.rb
class JwtService
    # The secret key for signing the JWT token, typically stored in credentials or environment variables
  HMAC_SECRET = Rails.application.credentials.secret_key_base

  # Encode the user information into a JWT token
  def self.encode(payload)
    payload[:scp] = 'user'
    payload[:exp] = 24.hours.from_now.to_i
    JWT.encode(payload, HMAC_SECRET)
  end

  # Decode the JWT token and retrieve the payload
  def self.decode(token)
    begin
      decoded = JWT.decode(token, HMAC_SECRET, true, { algorithm: 'HS256' })
      decoded.first
    rescue JWT::DecodeError => e
      nil  # Return nil if decoding fails
    end
  end
end
  