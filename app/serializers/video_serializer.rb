class VideoSerializer < ActiveModel::Serializer
  type 'videos'
  attributes :id, :title, :image_url, :video_url, :metadata
  attribute :video_data, if: -> { @instance_options[:video_data].present? }
  attribute :category_name, if: -> { @instance_options[:category_name].present? }

  def id
    object.id
  end

  def title
    object.title
  end

  def image_url
    object.image_url
  end

  def video_url
    object.video_url
  end

  def metadata
    object.metadata
  end

  def video_data
    @instance_options[:video_data]
  end

  def category_name
    @instance_options[:category_name]
  end
end
