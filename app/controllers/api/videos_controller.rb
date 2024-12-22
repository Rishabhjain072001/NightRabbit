class Api::VideosController < ApplicationController
  def index
    if params[:query].present?
      @videos = Video.joins(:categories)
                     .where("to_tsvector('english', videos.title) @@ plainto_tsquery(?) OR to_tsvector('english', categories.name) @@ plainto_tsquery(?)", params[:query], params[:query]) 
                     .page(params[:page])
                     .per(20)
    else
      @videos = Video.page(params[:page]).per(20)
    end

    render json: @videos, each_serializer: VideoSerializer
  end

  def show
    @video = Video.find(params[:id])
    video_data = VideoDataService.new(@video).fetch_video_data
    render json: @video, serializer: VideoSerializer, video_data: video_data
  end
end
