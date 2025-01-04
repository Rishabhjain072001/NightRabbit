class ReindexJob < ApplicationJob
  queue_as :default

  def perform(model_name)
    model = model_name.constantize

    index = 0
    model.find_in_batches(batch_size: 1000) do |batch|
      index += 1
      Rails.logger.info "Reindexing batch #{index}, batch size: #{batch.count}"

      video_count = 0
      batch.each do |video|
        video_count += 1
        Rails.logger.info "Reindexing video id #{video.id}"
        video.reindex
      end
    end
  end
end
