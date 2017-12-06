class TurnsController < ApplicationController

  def index
    turns = Turn.all
    render json: turns
  end

  def show
    turn = Turn.find(params[:id])
    render json:turn
  end

  def create
    turn = Turn.new(turn_params)
    if turn.save
      render json:turn
    end
  end

  private

  def turn_params
    params.require('turn').permit(:season, :year, :game_id)
  end
end
