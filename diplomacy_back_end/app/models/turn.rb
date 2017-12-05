class Turn < ApplicationRecord
  belongs_to :game
  has_many :orders

  def advance_turn
    if self.season == "Spring"
      self.season = "Fall"
    else
      self.season = "Spring"
      self.year += 1
    end
    "#{self.season}, #{self.year}"
  end

end
