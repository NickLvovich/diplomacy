class TurnSerializer < ActiveModel::Serializer
  attributes :id, :year, :season, :game_id, :orders
  has_many :orders
end
