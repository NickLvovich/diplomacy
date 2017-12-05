class GameSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :countries
  has_many :turns
end
