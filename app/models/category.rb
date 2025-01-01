class Category < ApplicationRecord
  searchkick

  has_many :video_categories
  has_many :videos, through: :video_categories
  
  def search_data
    {
      name: name
    }
  end
end
