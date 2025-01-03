class Video < ApplicationRecord
  searchkick  word_start: [:title, :category_names]

  has_many :video_categories
  has_many :categories, through: :video_categories
  has_many :user_watch_histories, dependent: :destroy
  has_many :watching_users, through: :user_watch_histories, source: :user

  belongs_to :website

  def search_data
    {
      title: title,
      category_ids: categories.pluck(:id),
      category_names: categories.pluck(:name),
      video_id: id,
      views: metadata&.[]('views') || 0,
    }
  end
end
