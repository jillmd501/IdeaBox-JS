Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :ideas, only: [:index, :create], defaults: { format: 'json'}
    end
  end

  root "ideas#index"
end
