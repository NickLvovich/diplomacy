Rails.application.routes.draw do
  resources :units
  resources :orders
  resources :territories
  resources :countries
  resources :turns
  resources :games
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
