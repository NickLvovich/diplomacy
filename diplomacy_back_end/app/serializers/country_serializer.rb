class CountrySerializer < ActiveModel::Serializer
  attributes :id, :name, :units
  belongs_to :user
  belongs_to :game
  has_many :units
end
