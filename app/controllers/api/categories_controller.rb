class Api::CategoriesController < ApplicationController
  def index
    letter = params[:letter]

    if letter == '#'
      categories = Category.where("name ~ '^[0-9]'").order(:name)
    else
      categories = Category.where("UPPER(name) LIKE ?", "#{letter.upcase}%").order(:name)
    end

    render json: categories, each_serializer: CategorySerializer
  end

  def videos
    category = Category.find(params[:id])
    videos = category.videos.page(params[:page]).per(20)
    render json: videos, each_serializer: VideoSerializer
  end
end  