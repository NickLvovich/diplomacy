class OrderSerializer < ActiveModel::Serializer
  attributes :id, :unit_id, :phase, :order_type, :from_territory, :to_territory, :coast
end
