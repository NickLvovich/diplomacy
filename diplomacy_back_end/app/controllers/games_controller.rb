class GamesController < ApplicationController

  def index
    games = Game.all
    render json: games.to_json
  end

  def show
    game = Game.find(params[:id])
    render json:game
  end

  def create
    game = Game.new(game_params)
    if game.save
      render json:game
    end
  end

  private

  def game_params
    params.require('game').permit(:name)
  end

end
