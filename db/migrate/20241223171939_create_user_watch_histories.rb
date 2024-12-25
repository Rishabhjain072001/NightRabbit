class CreateUserWatchHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :user_watch_histories do |t|
      t.references :user, null: false, foreign_key: true
      t.references :video, null: false, foreign_key: true
      t.datetime :last_watched_at, default: -> { 'CURRENT_TIMESTAMP' }  # Tracks when the video was last watched

      t.timestamps
    end

    # Ensure a user cannot have duplicate watch history for the same video
    add_index :user_watch_histories, [:user_id, :video_id], unique: true
  end
end
