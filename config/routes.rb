Rails.application.routes.draw do
  devise_for :users, skip: [:registrations], controllers: { sessions: 'users/sessions' }, path_names: { sign_in: 'sign_in', sign_out: 'sign_out' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :videos, only: [:index, :show]
  end

  # Serve React frontend for all other routes
  get '*path', to: 'application#frontend', constraints: ->(req) { !req.xhr? && req.format.html? }
end
