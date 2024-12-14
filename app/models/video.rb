class Video < ApplicationRecord
  has_many :video_categories
  has_many :categories, through: :video_categories

  belongs_to :website
end
