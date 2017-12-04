class TurnSerializer < ActiveModel::Serializer
  attributes :id, :season, :game_id, :orders
  has_many :orders
end
