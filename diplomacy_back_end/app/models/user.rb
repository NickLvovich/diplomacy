class User < ApplicationRecord
  has_many :countries
  has_many :games, through: :countries
  
end
