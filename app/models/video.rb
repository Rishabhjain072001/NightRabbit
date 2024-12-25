class Video < ApplicationRecord
  has_many :video_categories
  has_many :categories, through: :video_categories
  has_many :user_watch_histories, dependent: :destroy
  has_many :watching_users, through: :user_watch_histories, source: :user

  belongs_to :website
end
