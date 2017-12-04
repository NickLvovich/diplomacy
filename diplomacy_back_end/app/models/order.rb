class Order < ApplicationRecord
  belongs_to :turn
  belongs_to :unit
  belongs_to :territory_from, :class_name => :Territory, :foreign_key => "territory_id"
  belongs_to :territory_to, :class_name => :Territory, :foreign_key => "territory_id"

  
end
