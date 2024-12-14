# app/services/jwt_service.rb
class JwtService
    # The secret key for signing the JWT token, typically stored in credentials or environment variables
  HMAC_SECRET = Rails.application.credentials.secret_key_base

  # Encode the user information into a JWT token
  def self.encode(payload)
    # Expiration time can be added to the token payload, e.g., 24 hours
    payload[:exp] = 24.hours.from_now.to_i
    JWT.encode(payload, HMAC_SECRET)
  end

  # Decode the JWT token and retrieve the payload
  def self.decode(token)
    begin
      # Decode the token and return the payload
      decoded = JWT.decode(token, HMAC_SECRET, true, { algorithm: 'HS256' })
      decoded.first  # The first element contains the payload
      rescue JWT::DecodeError => e
      nil  # Return nil if decoding fails
    end
  end
end
  