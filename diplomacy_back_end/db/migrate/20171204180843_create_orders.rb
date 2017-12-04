class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.integer :turn_id
      t.integer :unit_id
      t.string :phase
      t.string :order_type
      t.integer :from_territory_id
      t.integer :to_territory_id

      t.timestamps
    end
  end
end
