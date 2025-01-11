class ReindexJob < ApplicationJob
  queue_as :default

  def perform(model_name, start_after_id = nil, last_id = nil)
    model = model_name.constantize
    index = 0

    # Define the base scope
    scope = model.where("id > ?", start_after_id || 0)
    
    # Apply the condition for the last ID if provided
    scope = scope.where("id <= ?", last_id) if last_id.present?

    scope.find_in_batches(batch_size: 1000) do |batch|
      index += 1
      Rails.logger.info "Reindexing batch #{index}, batch size: #{batch.count}"

      batch.each do |record|
        Rails.logger.info "Reindexing #{model_name.downcase} id #{record.id}"
        record.reindex
      end
    end
  end
end
