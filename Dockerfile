FROM ruby:3.1.6

# Install dependencies
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  nodejs \
  yarn \
  postgresql-client

# Set the working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock to install dependencies
COPY Gemfile Gemfile.lock ./

# Install Ruby gems
RUN bundle install --without development test

# Copy the project files
COPY . .

# Precompile assets
#RUN bundle exec rake assets:precompile

# Expose port 3000
EXPOSE 3001

# Start the Rails server, ensuring the server.pid file is removed
CMD ["bash", "-c", "rm -f /app/tmp/pids/server.pid && bundle exec rails server -b 0.0.0.0 -p 3001"]
