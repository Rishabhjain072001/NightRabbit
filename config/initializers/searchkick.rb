Searchkick.client = Elasticsearch::Client.new(
  host: ENV['ELASTICSEARCH_URL'] || 'http://localhost:9200',
  retry_on_failure: true,
  transport_options: { request: { timeout: 5 } }
)
