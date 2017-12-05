class Game < ApplicationRecord
  has_many :countries
  has_many  :users, through: :countries
  has_many :turns
  
end
