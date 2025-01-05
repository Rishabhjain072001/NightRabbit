FROM ruby:3.1.6

# Install dependencies
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  nodejs \
  yarn \
  postgresql-client \
  supervisor \
  redis-tools \
  && apt-get clean

# Set the working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock to install dependencies
COPY Gemfile Gemfile.lock ./

# Install Ruby gems
RUN bundle install --without development test

# Copy the project files
COPY . .

# Copy the Supervisor config file into the container
COPY supervisord.conf /etc/supervisor/conf.d/

# Expose port 3001 for Rails
EXPOSE 3001


# Start Supervisor to manage both Rails and Sidekiq processes
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

