class JwtBlacklist < ApplicationRecord
  belongs_to :user

  def self.revoked?(jti)
    exists?(jti: jti)
  end
end
