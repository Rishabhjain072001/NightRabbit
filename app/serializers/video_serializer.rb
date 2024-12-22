class VideoSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :video_url, :metadata
  attribute :video_data, if: -> { @instance_options[:video_data].present? }

  def video_data
    @instance_options[:video_data]
  end
end
