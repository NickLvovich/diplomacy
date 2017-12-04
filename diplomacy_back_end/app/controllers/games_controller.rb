class GamesController < ApplicationController

  def index
    games = Game.all
    render json: games.to_json
  end

  def show
    game = Game.find_by(params[:id])
    render json:game
  end

end
