class Order < ApplicationRecord
  belongs_to :turn
  belongs_to :unit  
end
