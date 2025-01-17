class ReindexJob < ApplicationJob
  queue_as :default

  def perform(model_name, start_id = 1)
    model = model_name.constantize
    index = 0

    model.find_in_batches(batch_size: 5000, start: start_id) do |batch|
      index += 1
      Rails.logger.info "Reindexing batch #{index}, batch size: #{batch.count}"
      
      # Bulk import records into Elasticsearch
      model.searchkick_index.import(batch)
    end
  end
end
