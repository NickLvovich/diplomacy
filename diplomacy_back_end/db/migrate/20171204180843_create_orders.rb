class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.integer :turn_id
      t.integer :unit_id
      t.string :phase
      t.string :order_type
      t.string :from_territory
      t.string :to_territory
      t.string :coast, default: nil
      t.timestamps
    end
  end
end
