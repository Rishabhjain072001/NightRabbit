class ReindexJob < ApplicationJob
  queue_as :default

  def perform(model_name)
    model = model_name.constantize
    index = 0

    model.find_in_batches(batch_size: 5000) do |batch|
      index += 1
      Rails.logger.info "Reindexing batch #{index}, batch size: #{batch.count}"

      batch.each do |record|
        Rails.logger.info "Reindexing #{model_name.downcase} id #{record.id}"
        record.reindex
      end
    end
  end
end
