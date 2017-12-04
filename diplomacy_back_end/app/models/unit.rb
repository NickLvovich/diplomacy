class Unit < ApplicationRecord
  has_many :orders
  belongs_to :country
  belongs_to :territory
end
