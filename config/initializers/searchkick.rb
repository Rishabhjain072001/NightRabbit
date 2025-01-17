Searchkick.client = Elasticsearch::Client.new(
  host: ENV['ELASTICSEARCH_URL'] || 'http://localhost:9200',
  transport_options: { request: { timeout: 5 } },
  user: ENV['ELASTICSEARCH_USERNAME'],        # Replace with your Elasticsearch username
  password: ENV['ELASTICSEARCH_PASSWORD']     # Replace with your Elasticsearch password
)
