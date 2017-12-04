class Territory < ApplicationRecord
  belongs_to :country
  belongs_to :unit
  has_many :orders
end
