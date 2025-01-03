require 'sidekiq/web'

if Rails.env.production?
  Sidekiq::Web.use Rack::Auth::Basic do |username, password|
    username == ENV['SIDEKIQ_USER'] && password == ENV['SIDEKIQ_PASSWORD']
  end
end

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  devise_for :users, skip: [:registrations], controllers: { sessions: 'users/sessions' }, path_names: { sign_in: 'sign_in', sign_out: 'sign_out' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  devise_scope :user do
    get 'users/validate_token', to: 'users/sessions#validate_token'
  end

  namespace :api do
    resources :videos, only: [:index, :show] do
      get :suggestions, on: :member
      get :search_suggestions, on: :collection
    end

    resources :categories, only: [:index] do
      get :videos, on: :member
    end
  end
end
