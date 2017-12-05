class CreateCountries < ActiveRecord::Migration[5.1]
  def change
    create_table :countries do |t|
      t.integer :game_id
      t.integer :user_id
      t.string :name

      t.timestamps
    end
  end
end
