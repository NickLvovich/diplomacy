class CreateTerritories < ActiveRecord::Migration[5.1]
  def change
    create_table :territories do |t|
      t.string :name
      t.string :abbreviation
      t.string :territory_type
      t.boolean :supply_center
      t.integer :country_id

      t.timestamps
    end
  end
end
