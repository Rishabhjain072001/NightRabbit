class AddExpiresAtToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :expires_at, :datetime
  end
end
