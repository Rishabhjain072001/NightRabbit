class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  before_create :set_jti

  private

  def set_jti
    self.jti ||= SecureRandom.uuid
  end

  def self.revoke_jwt(_payload = nil, user)
    if user.present?
      user.update_column(:jti, SecureRandom.uuid)
    else
      Rails.logger.error("Attempted to revoke JWT for a nil user")
    end
  end
end