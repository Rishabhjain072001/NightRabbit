class AddLastIpToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :last_ip, :string
  end
end
