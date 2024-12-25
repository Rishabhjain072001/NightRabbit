class Api::VideosController < ApplicationController
  def index
    if params[:query].present?
      @videos = Video.joins(:categories)
                     .where("videos.title ILIKE :query OR categories.name ILIKE :query", query: "%#{params[:query]}%")
                     .page(params[:page])
                     .per(20)
    else
      @videos = Video.page(params[:page]).per(20)
    end

    render json: @videos, each_serializer: VideoSerializer
  end

  def show
    @video = Video.find(params[:id])
    track_watch_history(current_user, @video)
    video_data = VideoDataService.new(@video).fetch_video_data
    render json: @video, serializer: VideoSerializer, video_data: video_data
  end
  
  def suggestions
    @video = Video.find(params[:id])
    category_ids = @video.categories.ids
  
    @videos = fetch_suggested_videos(category_ids, @video.id)
                 .page(params[:page])
                 .per(10)
  
    @videos = fallback_videos(@video.id) if @videos.empty?
  
    render json: @videos, each_serializer: VideoSerializer
  end

  private

  def fetch_suggested_videos(category_ids, video_id)
    Video.joins(:categories)
        .where(categories: { id: category_ids })
        .where.not(id: video_id)
        .distinct
        .select("videos.*, COALESCE(metadata->>'views', '0')::int AS views_order")
        .order("views_order DESC")
  end

  def fallback_videos(video_id)
    Video.where.not(id: video_id)
        .distinct
        .select("videos.*, COALESCE(metadata->>'views', '0')::int AS views_order")
        .order("views_order DESC")
        .page(params[:page])
        .per(10)
  end

  
  def track_watch_history(user, video)
    watch_history = UserWatchHistory.find_or_create_by(user: user, video: video)
    watch_history.track_watch
  end
end
