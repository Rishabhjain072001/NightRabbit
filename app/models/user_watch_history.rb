class UserWatchHistory < ApplicationRecord
  belongs_to :user
  belongs_to :video

  # Update the last_watched_at timestamp every time a video is watched
  def track_watch
    touch(:last_watched_at)
  end
end
