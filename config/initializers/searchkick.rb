Searchkick.client = Elasticsearch::Client.new(
  host: ENV['ELASTICSEARCH_URL'] || 'http://localhost:9200',
  transport_options: {
    headers: {
      'Authorization' => "Basic #{Base64.encode64("#{ENV['ELASTICSEARCH_USERNAME']}:#{ENV['ELASTICSEARCH_PASSWORD']}")}"
    }
  }
)
