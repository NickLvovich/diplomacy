class UnitSerializer < ActiveModel::Serializer
  attributes :id, :unit_type, :coast, :territory, :country
  belongs_to :country
end
