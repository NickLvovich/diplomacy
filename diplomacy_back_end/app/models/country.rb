class Country < ApplicationRecord
  belongs_to :user
  belongs_to :game
  has_many :units

end
