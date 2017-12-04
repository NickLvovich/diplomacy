class CreateUnits < ActiveRecord::Migration[5.1]
  def change
    create_table :units do |t|
      t.string :unit_type
      t.string :coast, default: nil
      t.string :territory
      t.integer :country_id

      t.timestamps
    end
  end
end
