class ReindexJob < ApplicationJob
  queue_as :default

  def perform(model_name)
    model = model_name.constantize

    index = 0
    model.find_each(batch_size: 1000) do |records|
      index = index + 1
      puts "Reindexing batch #{index}"
      records.reindex
    end
  end
end
