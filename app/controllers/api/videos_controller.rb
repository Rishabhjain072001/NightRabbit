class Api::VideosController < ApplicationController
  def index
    if params[:query].present?
      videos = Video.search(params[:query], 
        fields: ["title^10", "category_names^5"], 
        match: :word_start, 
        misspellings: { below: 5 },
        page: params[:page],
        per_page: 20
      )

      videos = videos.results if videos.respond_to?(:results)
    else
      videos = Video.page(params[:page]).per(20)
    end

    render json: videos, each_serializer: VideoSerializer
  end

  def show
    video = Video.find(params[:id])
    track_watch_history(current_user, video)
    video_data = VideoDataService.new(video).fetch_video_data
    render json: video, serializer: VideoSerializer, video_data: video_data
  end
  
  def suggestions
    video = Video.find(params[:id])
    category_ids = video.categories.ids
    videos = fetch_suggested_videos(category_ids, video.id).presence || fallback_videos(video.id)
  
    render json: videos, each_serializer: VideoSerializer
  end

  def search_suggestions
    suggestions = Video.search(params[:query][:localSearchquery], 
      fields: ["title^10", "category_names^5"], 
      match: :word_start, 
      limit: 8, 
      misspellings: { below: 5 }
    )

    render json: suggestions.map { |video| { 
      title: video.title, 
      category_name: video.categories.first&.name 
    } }
  end

  private

  def fetch_suggested_videos(category_ids, video_id)
   Video.search('*', 
               where: { category_ids: category_ids },
               where: { video_id: { gt: video_id } },
               page: params[:page], 
               per_page: 20,
              )
  end

  def fallback_videos(video_id)
    Video.search('*',
                where: { video_id: { gt: video_id } },
                page: params[:page], per_page: 20)
  end

  def track_watch_history(user, video)
    watch_history = UserWatchHistory.find_or_create_by(user: user, video: video)
    watch_history.track_watch
  end
end
