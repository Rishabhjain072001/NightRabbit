require 'httparty'

class VideoDataService
  def initialize(video)
    @video = video
  end

  def fetch_video_data
    response = HTTParty.post(
      "https://nightrabbit.countnine.com/scrape",
      body: { url: @video.video_url }.to_json,
      headers: { 'Content-Type' => 'application/json', 'Accept' => 'application/json' }
    )

    if response.success?
      JSON.parse(response.body)["video_data"]
    else
      {}  # Return an empty hash or handle the failure as needed
    end
  end
end
