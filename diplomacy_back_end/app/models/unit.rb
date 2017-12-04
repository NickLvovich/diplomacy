class Unit < ApplicationRecord
  has_many :orders
  belongs_to :country
end
