class CreateTurns < ActiveRecord::Migration[5.1]
  def change
    create_table :turns do |t|
      t.string :season
      t.integer :year
      t.integer :game_id

      t.timestamps
    end
  end
end
