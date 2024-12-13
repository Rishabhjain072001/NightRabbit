class Api::VideosController < ApplicationController
  before_action :authenticate_user!

  def index
    @videos = Video.all
    render json: VideoSerializer.new(@videos).serializable_hash
  end

  def show
    @video = Video.find(params[:id])
    render json: VideoSerializer.new(@video).serializable_hash
  end
end
