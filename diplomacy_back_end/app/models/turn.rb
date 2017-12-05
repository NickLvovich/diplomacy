class Turn < ApplicationRecord
  belongs_to :game
  has_many :orders
end
