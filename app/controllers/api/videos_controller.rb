class Api::VideosController < ApplicationController
  def index
    @videos = Video.page(params[:page]).per(10)
    render json: @videos, each_serializer: VideoSerializer
  end

  def show
    @video = Video.find(params[:id])
    render json: @videos, serializer: VideoSerializer
  end
end
