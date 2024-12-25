class ConvertMetadataToJsonb < ActiveRecord::Migration[6.1]
  def change
    # Convert json to jsonb
    change_column :videos, :metadata, :jsonb, using: 'metadata::jsonb'

    # Make the migration reversible
    reversible do |dir|
      dir.up do
        # Convert json to jsonb when migrating up
        change_column :videos, :metadata, :jsonb, using: 'metadata::jsonb'
      end

      dir.down do
        # Convert jsonb back to json when rolling back
        change_column :videos, :metadata, :json, using: 'metadata::json'
      end
    end
  end
end
